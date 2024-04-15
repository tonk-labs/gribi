import { CompiledCircuit, BarretenbergBackend, ProofData } from '@noir-lang/backend_barretenberg';
import { InputMap, InputValue } from '@noir-lang/noirc_abi';
import { Noir } from '@noir-lang/noir_js'

import { PublicInput, Operation, EVMRootSystem } from 'src';
import { Forest } from '../forest'; 

export const setup = async () => {
    await Promise.all([
      import("@noir-lang/noirc_abi").then(module => 
        module.default(new URL("@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm", import.meta.url).toString())
      ),
      import("@noir-lang/acvm_js").then(module => 
        module.default(new URL("@noir-lang/acvm_js/web/acvm_js_bg.wasm", import.meta.url).toString())
      )
    ]);
  }


const generateProof = async (circuit: CompiledCircuit, inputs: InputMap): Promise<ProofData> => {
    // const be = new BarretenbergBackend(circuit);
    // const noir  = new Noir(circuit, be);
    // const { witness } = await noir.execute(inputs);
    // return be.generateIntermediateProof(witness);
    return {
        publicInputs: [],
        proof: new Uint8Array(),
    };
} 

export const prove = async (address: string, circuit: CompiledCircuit, inputs: PublicInput[], operations: Operation[], witnessMap: InputMap): Promise<ProofData> => {
    const roots = Forest.getRoots();
    if (inputs.length > 8 ) {
        throw new Error("inputs cannot exceed size of 8 entries");
    }
    if (operations.length > 8) {
        throw new Error("operations cannot exceed size of 8 entries");
    }

    let sanitizedInputs = inputs.concat(new Array(8 - inputs.length).map(() => ({
        slot: 0,
        value: 0
    }))).map((i) => i as InputMap);

    let sanitizedOperations = operations.concat(new Array(8 - inputs.length).map(() => ({
        opid: 0,
        value: 0,
        nullifier: 0
    }))).map((i) => i as InputMap);

    witnessMap['commitment_root'] = 0;
    witnessMap['nullifier_root'] = 0;
    witnessMap['public_root'] = 0;
    witnessMap["address"] = address;
    witnessMap["inputs"] = sanitizedInputs;
    witnessMap["operations"] = sanitizedOperations;

    // TODO: how will we fetch the roots from onchain?
    // witnessMap['commitment_root'] = roots.commitment;
    // witnessMap['nullifier_root'] = roots.nullifier;
    // witnessMap['public_root'] = roots.public;

    return generateProof(circuit, witnessMap);
}
