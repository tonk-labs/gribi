import { Vault } from "@gribi/vault"; 
import { Transaction } from "@gribi/evm-rootsystem";

export const createSecrets = async (activeAddress: () => string) => {
  // we have the random commitment + random number
  // we have the inventory of treasure with the commitment to that treasure item
  // we have a nullifier & nonce used to eliminate that treasure item

  //Maybe here we could actually use the selectors? Since the entries kind of suck
  return { ...Vault.getModules(activeAddress()) }
}

export type NetworkCall = (tx: Transaction) => Promise<void>

export interface Module<T> {
  createModuleCalls: (call: NetworkCall) => T;
}

