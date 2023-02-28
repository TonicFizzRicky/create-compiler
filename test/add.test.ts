import {expect,test} from 'vitest'
import {add} from '../src/index'
test("add function",() => {
    const result = add(1,2,3,4)
    expect(result).toBe(10)
})