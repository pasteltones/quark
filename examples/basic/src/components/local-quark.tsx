import { useQuarkLocal } from '@pasteltones/quark'

interface CountState {
  count: number
  setCount: (count: number) => void
  increment: () => void
}

export function LocalQuark() {
  const { count, setCount, increment } = useQuarkLocal<CountState>(set => ({
    count: 0,
    setCount: count => set({ count }),
    increment: () => set(state => ({ count: state.count + 1 })),
  }))

  return (
    <div>
      <h2>LocalQuark</h2>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={() => setCount(count + 1)}>Set Count</button>
    </div>
  )
}
