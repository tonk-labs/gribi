import { expect, test } from 'vitest'
import { Utils } from '../../src/utils/index'

test('test pedersen hash on empty input', async () => {
    let result = await Utils.keccak([]);
    // expect(result).toBe(
    //     3005290860655143328229594257782869703809332764983783944062462322544469669551n
    // );
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

