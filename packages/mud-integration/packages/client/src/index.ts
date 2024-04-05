import { Vault, PrivateEntry } from "@gribi/vault";
import { EVMRootSystem, Transaction } from "@gribi/evm-rootsystem";

export interface Selector<
  S = unknown
> {
  select(): S;
}

export type SelectorInfo = {
  selector: Selector;
  children: StateMap;
}

export type StateMap = {
  [key: string]: SelectorInfo 
}

export const createSecretsState = (stateMap: StateMap): <S>() => S => {
  // we have the random commitment + random number
  // we have the inventory of treasure with the commitment to that treasure item
  // we have a nullifier & nonce used to eliminate that treasure item

  //Maybe here we could actually use the selectors? Since the entries kind of suck
  const computeState = <S>(): S => {
    let state: any = {};
    const keys = Object.keys(stateMap);
    keys.forEach((key) => {
      // recurse 
      if (stateMap[key].children) {
        state[key] = createSecretsState(stateMap[key].children);
      } else {
        const info = stateMap[key];
        state[key] = info.selector.select();
      }
    });

    return state;
  }

  return computeState;
}

export type NetworkCall = (tx: Transaction) => Promise<void>

export interface Module<T> {
  createModuleCalls: (call: NetworkCall) => T;
}

