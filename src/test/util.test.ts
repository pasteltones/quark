import { shallow } from '../util'

describe('shallow', () => {
  it('returns true for identical objects | 동일한 객체에 대해 true를 반환한다', () => {
    const obj = { a: 1, b: 2 }

    const result = shallow(obj, obj)

    expect(result).toBe(true)
  })

  it('returns true for objects with same properties and values | 같은 속성과 값을 가진 객체에 대해 true를 반환한다', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { a: 1, b: 2 }

    const result = shallow(obj1, obj2)

    expect(result).toBe(true)
  })

  it('returns false for objects with different values | 다른 값을 가진 객체에 대해 false를 반환한다', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { a: 1, b: 3 }

    const result = shallow(obj1, obj2)

    expect(result).toBe(false)
  })

  it('returns false for objects with different properties | 다른 속성을 가진 객체에 대해 false를 반환한다', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { a: 1, c: 2 }

    // @ts-expect-error - For type testing
    const result = shallow(obj1, obj2)

    expect(result).toBe(false)
  })

  it('returns false for objects with different number of properties | 속성 개수가 다른 객체에 대해 false를 반환한다', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { a: 1 }

    const result = shallow(obj1, obj2)

    expect(result).toBe(false)
  })

  it('returns false when comparing object with non-object | 객체와 비객체를 비교할 때 false를 반환한다', () => {
    const obj = { a: 1 }

    const result = shallow(obj, null)

    expect(result).toBe(false)

    // @ts-expect-error - For type testing
    const result2 = shallow(obj, 'string')

    expect(result2).toBe(false)

    // @ts-expect-error - For type testing
    const result3 = shallow(obj, 123)

    expect(result3).toBe(false)
  })

  it('returns true for same primitive values | 같은 원시 값에 대해 true를 반환한다', () => {
    expect(shallow(1, 1)).toBe(true)
    expect(shallow('string', 'string')).toBe(true)
    expect(shallow(true, true)).toBe(true)
  })

  it('returns false for different primitive values | 다른 원시 값에 대해 false를 반환한다', () => {
    expect(shallow(1, 2)).toBe(false)
    expect(shallow('string1', 'string2')).toBe(false)
    expect(shallow(true, false)).toBe(false)
  })
})
