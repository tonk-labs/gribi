import { encodeAbiParameters, concatHex, toFunctionSelector } from 'viem';
import { NetworkCall } from '../kernel';
import { CompiledCircuit } from '@noir-lang/backend_barretenberg';
import { RootSystem, Signal } from '@gribi/types';
import { Hex } from 'viem'
import { ProofData } from '@noir-lang/backend_barretenberg';
import { Transaction, PublicInput, Operation, StateUpdate } from '../types';

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

export interface Module<T> {
  createModuleCalls: (call: NetworkCall) => T;
}

const sanitizeOperations = (operations: Operation[]): Operation[] => {
  return operations.map((op) => {
    let newOp = { ...op };
    if (!op.nullifier) {
      newOp.nullifier = 0
    }
    if (!op.value) {
      newOp.value = 0
    }
    if (!op.opid) {
      newOp.opid = 0
    }
    return newOp;
  });
} 

const createTx = async (update: StateUpdate): Promise<Transaction> => {
  //do stuff with the kernel
  let proof: any;

  // TODO Kernel Circuit stuff for now is commented out for testing
  // if (circuit != undefined) {
  //     const roots = Forest.getRoots();
  //     const kernel = new KernelCircuit();
  //     await kernel.init();
  //     proof = await kernel.generateProof(inputs, operations, roots, circuit);
  // }

  //This might be a horrible hack and would be better to do it right way if can fix Viem
  const signature = toFunctionSelector(`${update.method}(((uint256,uint256)[],(uint256,uint256,uint256)[]))`);
  
  //We use this super weird signature, because viem is somehow using mismatched versions when I install with pnpm, no idea why
  // const signature = sliceHex(keccak256(toHex(toBytes(`${method}(((uint256,uint256)[],(uint256,uint256,uint256)[]))`))), 0, 4);
  const params = encodeAbiParameters(Inputs, [{ inputs: update.inputs, operations: sanitizeOperations(update.operations) }]);
  const data = concatHex([signature, params ?? '0x']);

  //TODO: update proof to be right data type
  return proof === undefined ? ({
      id: update.id, data 
  }) : ({
      id: update.id, data, proof
  });
}

class _EVMRootSystem implements RootSystem<StateUpdate, Transaction> {
  walletAddress = "00";
  async createTxs(signals: Signal<StateUpdate>[]): Promise<Transaction[]>{
    return Promise.all(signals.map((signal) => {
      const output = signal.output;
      return createTx(output);
    }));
  }
}

export const EVMRootSystem = new _EVMRootSystem();