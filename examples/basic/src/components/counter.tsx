import { quark } from '@pasteltones/quark'

interface CountStore {
  count: number

  increment: () => void
  decrement: () => void
}

const useCount = quark<CountStore>(set => ({
  count: 0,

  increment: () => {
    set(prev => ({ count: prev.count + 1 }))
  },
  decrement: () => {
    set(prev => ({ count: prev.count - 1 }))
  },
}))

export function Counter() {
  const { count, increment, decrement } = useCount()

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={useCount.reset}>Reset</button>
    </div>
  )
}
