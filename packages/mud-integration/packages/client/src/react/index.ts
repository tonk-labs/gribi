import {  Transaction } from "@gribi/evm-rootsystem";

/**
 * This may be helpful for the 'react' template in MUD
 * @param modules 
 * @param mudCall 
 * @returns 
 */
export function combineGribiModuleCalls<T>(modules: Module<T>[], mudCall: (t: Transaction) => Promise<void>): T {
    return modules.map((module) => module.createModuleCalls(mudCall)).reduce((acc, value) => {
        return {
        ...acc,
        ...value
        }
    }, {} as T);
} 

export type NetworkCall = (tx: Transaction) => Promise<void>

export interface Module<T> {
  createModuleCalls: (call: NetworkCall) => T;
}

