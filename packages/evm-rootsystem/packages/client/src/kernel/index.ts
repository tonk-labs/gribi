import { Hex } from 'viem'
import { BarretenbergBackend, CompiledCircuit, ProofData } from '@noir-lang/backend_barretenberg';
import { Noir, InputMap } from '@noir-lang/noir_js';
import { InputValue } from '@noir-lang/noirc_abi';

import _kernel from "gribi-circuits/kernel/target/circuits.json";

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

export type NetworkCall = (tx: Transaction) => Promise<void>

export class KernelCircuit {
    async init() {

    }

    async generateProof(inputs: PublicInput[], operations: Operation[], roots: Roots, circuit: CompiledCircuit): Promise<Proof> {
        return new Promise((success) => { 
            success({
                data: undefined 
            });
        });
    }
}