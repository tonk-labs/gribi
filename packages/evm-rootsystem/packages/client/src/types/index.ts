import { Hex } from 'viem';
import { CompiledCircuit, ProofData } from '@noir-lang/backend_barretenberg';

export type Field = number | bigint | string;

export type PublicInput = {
    slot: Field,
    value: Field
}

export type Operation = {
    opid: Field,
    value?: Field,
    nullifier?: Field,
}

// we need a Merkle Tree class, but for nw these are fine
export type Roots = {
    commitment: string,
    nullifier: string,
    public: string
}

export type Proof = {
    inputs?: PublicInput[],
    //not sure what's in here but we'll assume it's something interesting
    data: ProofData | undefined
}

export type Transaction = {
    id: BigInt,
    data: Hex,
    proof?: Proof,
}

export type StateUpdate = {
  id: BigInt,
  method: string,
  inputs: PublicInput[],
  operations: Operation[],
  proof?: ProofData 
}