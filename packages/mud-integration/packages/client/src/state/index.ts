export interface Selector<
  S = unknown
> {
  select(): S | null;
}

export type SelectorInfo = {
  selector?: Selector;
  children?: StateMap;
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
      const info = stateMap[key];
      if (info.children) {
        state[key] = createSecretsState(info.children!);
      } else if (info.selector) {
        state[key] = info.selector.select();
      }
    });

    return state;
  }

  return computeState;
}