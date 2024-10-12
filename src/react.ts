import { useDebugValue, useSyncExternalStore } from 'react'
import { Quark } from './vanilla'
import type { CreateState, UseQuark } from './types'

export function useStore<T>(store: Quark<T>) {
  const state = useSyncExternalStore(store.subscribe, store.getState, store.getState)

  const result = { ...state, reset: store.reset }
  useDebugValue(result)
  return result
}

/**
 *
 * @example
 * ```ts
 * interface QuarkState {
 *   count: number
 *   increment: () => void
 *   decrement: () => void
 * }
 *
 * const useCount = quark<QuarkState>(set => ({
 *   count: 0,
 *   increment: () => {
 *     set(prev => ({ count: prev.count + 1 }))
 *   },
 *   decrement: () => {
 *     set(prev => ({ count: prev.count - 1 }))
 *   },
 * }))
 * ```
 */
export function quark<T>(store: CreateState<T>) {
  /* TODO:
  1. store는 function 이거나 값이어야 한다.
  2. function인 경우, 타입은 CreateState<T>이다. (setState, getState, store를 인자로 받아서 T를 반환하는 함수)
  3. 값인 경우, 그냥 그 값이 initial state가 된다.
    - 반환되는 값은 [state, setState: store.setState] 형태이다. (useState와 유사)
  4. 이를 구현하는 방법은,
    - quark의 파라미터에 타입을 CreateState<T> 형태와 그냥 객체를 받는 두가지 타입을 허용하도록 설정한다.
    - 그런 다음, 파라미터로 받은 것이 function인지 아닌지 구분하는 로직을 추가한다.
    - 만약 function이라면, Quark.create(store)로 Quark 인스턴스를 생성한다.
    - 만약 값이라면, Quark.create(() => store)로 Quark 인스턴스를 생성한다.
    - 그런다음 useStore를 두가지 형태로 함수를 따로 만들어서 최대한 순수함수에 가깝게 만든다.
  */

  const quark = Quark.create(store)

  const useQuark = () => useStore(quark)
  Object.assign(useQuark, quark.api)

  return useQuark as UseQuark<T>
}

// 최종 형태
// const nameQuark = quark('John')
// const profileQuark = quark({ name: 'John', age: 20, skills: ['React', 'TypeScript'] })

// const [name, setName] = useQuark(nameQuark)
// const [profile, setProfile] = useQuark(profileQuark)

// interface User {
//   name: string
//   age: number
//   skills: string[]
// }

// interface UserQuarkState {
//   user: User
//   addSkill: (skill: string) => void
// }

// const useUser = quark<UserQuarkState>(set => ({
//   user: {
//     name: 'John',
//     age: 20,
//     skills: ['React', 'TypeScript'],
//   },
//   addSkill: skill =>
//     set(prev => ({ user: { ...prev.user, skills: [...prev.user.skills, skill] } })),
// }))
