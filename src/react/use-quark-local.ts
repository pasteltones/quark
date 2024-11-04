import { useState } from 'react'
import { CreateState } from '../types'
import { quark } from '../quark'

/**
 *
 * @example
 * ```tsx
 * interface IStore {
 *   count: number
 *   setCount: (count: number) => void
 *   increment: () => void
 * }
 *
 * export function MyComponent() {
 *   const { count, setCount, increment } = useQuarkLocal<IStore>(set => ({
 *     count: 0,
 *     setCount: count => set({ count }),
 *     increment: () => set(state => ({ count: state.count + 1 })),
 *   }))
 * }
 * ```
 */
export function useQuarkLocal<T>(store: CreateState<T>) {
  const [useStore] = useState(() => quark<T>(store, { as: 'local' }))

  const { scope, reset } = useStore

  return { ...useStore(), scope, reset }
}
