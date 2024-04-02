// This script provides basic functions to use local storage as a key-value store.
import { PCD, Signal } from "@gribi/types";


export type PrivateEntry = {
    commitment: string,
    slot: number,
    value: any,
}

type PrivateData = {
    entries: PCD[], 
    data: Record<string, PCD>
}

export type ModuleData = {
    modules: Record<string, PrivateData>
}

/**
 * This returns all modules with entries currently held by user
 * @param address wallet address of caller
 * @returns 
 */
function getModules(address: string): ModuleData {
    let db = getItem(address);
    return db === undefined ? { modules: {} } : db!;
}

/**
 * This returns all private entries currently held by user
 * @param address wallet address of caller
 * @returns 
 */
function getEntries(address: string, namespace: string): PCD[] {
    initIfEmpty(address, namespace);
    return getItem(address)!.modules[namespace].entries;
} 

/**
 * Set entry in the vault
 * 
 * @param address wallet address of caller
 * @param entry local item being committed
 */
function setEntry(address: string, namespace: string, entry: PCD) {
    initIfEmpty(address, namespace);
    const db = getItem(address)!;
    const privateData = db.modules[namespace];
    let existIndex = privateData.entries.findIndex((item) => {
        return item.uri === entry.uri
    });

    // this is an update operation
    if (existIndex >= 0) {
        privateData.entries[existIndex] = entry;
    } else {
        privateData.entries.push(entry);
    }

    privateData.data[entry.uri.string] = entry;
    db.modules[namespace] = privateData;
    setItem(address, db);
}

/**
 * Remove the entry, may be necessary for reversions or when private data
 * is no longer necessary
 * 
 * @param address wallet address of caller
 * @param entry local item being removed
 */
function removeEntry(address: string, namespace: string, entry: PCD) {
    initIfEmpty(address, namespace);
    const db = getItem(address)!;
    const privateData = db.modules[namespace];
    let filtered = privateData.entries.filter((item) => {
        return item.uri.string !== entry.uri.string
    });
    privateData.entries = filtered;
    delete privateData.data[entry.uri.string];
    db.modules[namespace] = privateData;
    setItem(address, db);
}

/**
 * 
 * @param address wallet address of the caller
 * @param namespace namespace of the module 
 * @param commitment commitment to retrieve
 * @returns 
 */
function getPCDForURI(address: string, namespace: string, uri: string): PCD | undefined {
    initIfEmpty(address, namespace);
    const privateData = getItem(address)!;
    return privateData.modules[namespace].entries.find((entry) => entry.uri.string === uri);
}

/**
 * Helper func to initialize db for wallet if the wallet's db doesn't exist 
 * @param address wallet address of the caller
 */
function initIfEmpty(address: string, namespace: string) {
    let blob = getItem(address);
    if (!blob) {
        setItem(address, {
            modules: {
                [namespace]: {
                    entries: [],
                    data: {}
                }
            }
        });
    } else if (!blob.modules[namespace]) {
        blob.modules[namespace] = {
            entries: [],
            data: {}
        }
        setItem(address, blob);
    }
}

/**
 * Sets a value in local storage.
 * @param {string} key - The key under which to store the value.
 * @param {PrivateData} value - The value to store.
 */
function setItem(key: string, value: ModuleData) {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Gets a value from local storage.
 * @param {string} key - The key of the value to retrieve.
 * @returns {PrivateData|null} - The retrieved value or null if the key does not exist.
 */
function getItem(key: string): ModuleData | null {
    const item = localStorage.getItem(key);
    if (!item) {
        return null;
    }
    return JSON.parse(item);
}

/**
 * Removes a value from local storage.
 * @param {string} key - The key of the value to remove.
 */
function removeItem(key: string) {
    localStorage.removeItem(key);
}

/**
 * Clears all key-value pairs in local storage.
 */
function clearStorage() {
    localStorage.clear();
}

export const Vault = {
    getModules,
    getEntries,
    setEntry,
    removeEntry,
    getPCDForURI
}