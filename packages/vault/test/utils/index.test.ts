import { expect, test } from 'vitest'
import { Utils } from '../../src/utils/index'

test('test pedersen hash on empty input', async () => {
    let result = await Utils.pedersenHash([]);
    expect(result).toBe(
        3005290860655143328229594257782869703809332764983783944062462322544469669551n
    );
})