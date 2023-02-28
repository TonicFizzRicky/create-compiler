import {expect,test} from 'vitest'
import {compiler} from '../src/compiler'

test("test compiler function",() => {
    const input = `(add 2 (sub 4 3))`;
    const compiledResult = compiler(input)
    const expectResult = `add(2, sub(4, 3));q`
    expect(compiledResult).toBe(expectResult)
})