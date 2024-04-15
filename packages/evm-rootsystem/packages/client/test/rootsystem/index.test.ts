import { expect, test } from 'vitest'
import { EVMRootSystem, StateUpdate, Field } from '../../src'
import { Signal } from '@gribi/types'
import { toFunctionSelector } from 'viem'

test('test create tx', async () => {
    //3005290860655143328229594257782869703809332764983783944062462322544469669551n
    const signal: Signal<StateUpdate> = {
        output: {
            id: "3005290860655143328229594257782869703809332764983783944062462322544469669551",
            method: "test",
            inputs: [{
                slot: 0,
                value: 0,
            }],
            operations: [{
                opid: 0,
                value: BigInt("3005290860655143328229594257782869703809332764983783944062462322544469669551") as Field,
                nullifier: 0,
            }]
        }
    }
    EVMRootSystem.createTxs([signal]);
})