import { quark } from '@pasteltones/quark'

interface State {
  count: number
  text: string
  incrementCount: () => void
  setText: (text: string) => void
}
const useStore = quark<State>(set => ({
  count: 0,
  text: '',
  incrementCount: () => set(state => ({ count: state.count + 1 })),
  setText: text => set({ text }),
}))

let parentRenderCount = 0
let childRenderCount = 0

export function ChildComponent() {
  const count = useStore(state => state.count)

  console.log('ChildComponent render count', ++childRenderCount)

  return (
    <div>
      <h2>ChildComponent</h2>
      <p>count: {count}</p>
    </div>
  )
}

export function ParentComponent() {
  const { text, incrementCount, setText } = useStore(state => ({
    text: state.text,
    incrementCount: state.incrementCount,
    setText: state.setText,
  }))

  console.log('ParentComponent render count', ++parentRenderCount)

  return (
    <div>
      <h1>ParentComponent</h1>
      <button onClick={incrementCount}>increment count</button>
      <input
        type='text'
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder='input text'
      />
      <ChildComponent />
    </div>
  )
}
