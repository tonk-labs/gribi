import { toHex, sliceHex, keccak256, toBytes, encodeAbiParameters, concatHex, toFunctionSelector } from 'viem';
import { Proof, PublicInput, Transaction, Operation, KernelCircuit } from './kernel';
import { NetworkCall } from './kernel';
import { Forest } from './forest';
import { CompiledCircuit } from '@noir-lang/backend_barretenberg';

const Inputs = [  {
    "name": "transaction",
    "type": "tuple",
    "internalType": "struct Transaction",
    "components": [
      {
        "name": "inputs",
        "type": "tuple[]",
        "internalType": "struct PublicInput[]",
        "components": [
          {
            "name": "slot",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "value",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      },
      {
        "name": "operations",
        "type": "tuple[]",
        "internalType": "struct Operation[]",
        "components": [
          {
            "name": "opid",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "value",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "nullifier",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      }
    ]
  }];

// const moduleABI = (method: string) => {
//     return {
//         inputs: Inputs,
//         name: method,
//         outputs: [],
//         stateMutability: 'pure',
//         type: 'function'
//     }; 
// }

export interface Module<T> {
  createModuleCalls: (call: NetworkCall) => T;
}

export const Gribi = {    
    walletAddress: "00",
    createGribiTx: async (id: BigInt, method: string, inputs: PublicInput[], operations: Operation[], circuit?: CompiledCircuit): Promise<Transaction> => {
        //do stuff with the kernel
        let proof;

        // TODO Kernel Circuit stuff for now is commented out for testing
        // if (circuit != undefined) {
        //     const roots = Forest.getRoots();
        //     const kernel = new KernelCircuit();
        //     await kernel.init();
        //     proof = await kernel.generateProof(inputs, operations, roots, circuit);
        // }

        //This might be a horrible hack and would be better to do it right way if can fix Viem
        const signature = toFunctionSelector(`${method}(((uint256,uint256)[],(uint256,uint256,uint256)[]))`);
        // const signature = sliceHex(keccak256(toHex(toBytes(`${method}(((uint256,uint256)[],(uint256,uint256,uint256)[]))`))), 0, 4);
        const params = encodeAbiParameters(Inputs, [{ inputs, operations }])
        const data = concatHex([signature, params ?? '0x']);

        //TODO: update proof to be right data type
        return proof === undefined ? ({
            id, data 
        }) : ({
            id, data, proof
        });
    }
}