import { expect, test } from 'vitest'
import { Utils } from '../../src/utils/index'
import { toHex } from 'viem'

test('test pedersen hash on empty input', async () => {
    let result = await Utils.pedersenHash([]);
    expect(result).toBe(
        14735921632689459485083976756786850169391762506238474562176450493537065610012n 
    );
})

function testRandom() {
    const random = Utils.rng() as bigint;
    const max = (BigInt(2) ** BigInt(254)) as bigint;
    return random < max;
}

test('test size of rand util', async () =>{
    expect(testRandom()).toBe(true);
    expect(testRandom()).toBe(true);
    expect(testRandom()).toBe(true);
    expect(testRandom()).toBe(true);
    expect(testRandom()).toBe(true);
    expect(testRandom()).toBe(true);
    expect(testRandom()).toBe(true);
});