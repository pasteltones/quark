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

// 자식 컴포넌트
export function ChildComponent() {
  const count = useStore(state => state.count)

  console.log('ChildComponent 렌더링')

  return (
    <div>
      <h2>자식 컴포넌트</h2>
      <p>카운트 값: {count}</p>
    </div>
  )
}

// 부모 컴포넌트
export function ParentComponent() {
  const { text, incrementCount, setText } = useStore(state => ({
    text: state.text,
    incrementCount: state.incrementCount,
    setText: state.setText,
  }))

  console.log('ParentComponent 렌더링')

  return (
    <div>
      <h1>부모 컴포넌트</h1>
      <button onClick={incrementCount}>카운트 증가</button>
      <input
        type='text'
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder='텍스트 입력'
      />
      <ChildComponent />
    </div>
  )
}
