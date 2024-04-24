import { CompiledCircuit, BarretenbergBackend, ProofData } from '@noir-lang/backend_barretenberg';
import { InputMap, InputValue } from '@noir-lang/noirc_abi';
import { Noir } from '@noir-lang/noir_js'
import { toHex } from 'viem';

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


const generateProof = async (circuit: NoirCircuit, inputs: InputMap): Promise<ProofData> => {
    const be = new BarretenbergBackend(circuit);
    const noir  = new Noir(circuit, be);
    console.log(inputs);
    const { witness } = await noir.execute(inputs);
    return be.generateProof(witness);
} 

export const prove = async (address: string, circuit: NoirCircuit, inputs: PublicInput[], operations: Operation[], witnessMap: InputMap): Promise<ProofData> => {
    const roots = Forest.getRoots();
    if (inputs.length > 8 ) {
        throw new Error("inputs cannot exceed size of 8 entries");
    }
    if (operations.length > 8) {
        throw new Error("operations cannot exceed size of 8 entries");
    }
    // Correct padding logic for inputs
    let sanitizedInputs = inputs.concat([...Array(8 - inputs.length)].map(() => ({
      slot: toHex(0),
      value: toHex(0)
  }))).map((i) => i as InputMap);

  // Correct padding logic for operations
  let sanitizedOperations = operations.concat([...Array(8 - operations.length)].map(() => ({
      opid: toHex(0),
      value: toHex(0),
      nullifier: toHex(0)
  }))).map((i) => i as InputMap);

    witnessMap['commitment_root'] = toHex(0);
    witnessMap['nullifier_root'] = toHex(0);
    witnessMap['public_root'] = toHex(0);
    witnessMap["address"] = toHex(address);
    witnessMap["inputs"] = sanitizedInputs;
    witnessMap["operations"] = sanitizedOperations;

    // TODO: how will we fetch the roots from onchain?
    // witnessMap['commitment_root'] = roots.commitment;
    // witnessMap['nullifier_root'] = roots.nullifier;
    // witnessMap['public_root'] = roots.public;

    return generateProof(circuit, witnessMap);
}

export type NoirCircuit = CompiledCircuit;

