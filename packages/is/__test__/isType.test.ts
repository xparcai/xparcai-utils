import { describe, expect, it } from 'vitest'
import { isType } from '../index'

describe('@xparcai-utils/is', () => {
  it('isType', () => {
    expect(isType(1, 'Number')).toBe(true)
    expect(isType('1', 'String')).toBe(true)
    expect(isType(true, 'Boolean')).toBe(true)
    expect(isType({}, 'Object')).toBe(true)
    expect(isType(new Function(), 'Function')).toBe(true)
    expect(isType(undefined, 'Undefined')).toBe(true)
    expect(isType([], 'Array')).toBe(true)
    expect(isType(null, 'Null')).toBe(true)
    expect(isType(new Date(), 'Date')).toBe(true)
    expect(isType(new WeakMap(), 'WeakMap')).toBe(true)
    expect(isType(new Map(), 'Map')).toBe(true)
    expect(isType(new Set(), 'Set')).toBe(true)
    expect(isType(new RegExp('a'), 'RegExp')).toBe(true)
    expect(isType(JSON, 'JSON')).toBe(true)
    expect(isType(new Error(), 'Error')).toBe(true)
    expect(isType(Math, 'Math')).toBe(true)
  })
})
