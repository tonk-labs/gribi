import { expect, test } from 'vitest'

import _init_move from '../../testData/init_move/target/init_move.json'

test('initializes without issue', async () => {
    // const kernel = new KernelCircuit();
    // await kernel.init();
})

// test('test init move', async () => {
//     const kernel = new KernelCircuit();
//     await kernel.init();

//     await kernel.registerCircuit('init_move', _init_move as CompiledCircuit);
//     const proofData = await kernel.generateProofForId('init_move', {
//         x: 0,
//         y: 0,
//         nonce: 1,
//     }, [
//         0,
//         0,
//     ]);

//     // console.log(proofData.publicInputs);
// })