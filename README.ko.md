# Quark

Quark는 React 애플리케이션에서 상태 관리를 간편하고 효율적으로 할 수 있도록 돕는 상태 관리
라이브러리입니다. Quark는 가볍고 사용하기 쉬우며, 복잡한 상태 관리 요구 사항을 위한 강력한 기능도
제공합니다.

## 특징

- **간단한 API**: Quark는 상태 관리를 위한 간단하고 직관적인 API를 제공합니다.
- **Type Safety**: Quark는 상태에 대한 타입 안전성을 제공하여 상태가 항상 일관되도록 보장합니다.

## Installation

Quark를 설치하려면 다음 명령어를 실행하세요:

```bash
npm install @pasteltones/quark
yarn add @pasteltones/quark
pnpm add @pasteltones/quark
bun add @pasteltones/quark
```

# Usage

Quark는 React 애플리케이션에서 상태 관리를 간편하고 효율적으로 할 수 있도록 돕는 라이브러리입니다.
Quark는 두 가지 주요 사용 방식을 제공합니다: Single Quark와 Quark Store. 이 문서에서는 Quark의
사용법을 예제를 통해 설명합니다.

<!--  -->

## Single Quark

Single Quark는 useState와 유사한 방식으로 단일 상태 값을 관리합니다. 이는 간단한 상태 관리에
적합하며, jotai나 recoil, sangte와 유사한 방식으로 작동합니다.

```tsx
import { quark } from '@pasteltones/quark'

const useName = quark('John')

function Name() {
  const [name, setName] = useName()
  return <input type='text' value={name} onChange={e => setName(e.target.value)} />
}
```

위 예제에서 useName은 Single Quark로, name 상태를 관리합니다. setName 함수를 통해 상태를 업데이트할
수 있습니다.

<!--  -->

## Quark Store

Quark Store는 zustand와 유사하게 상태와 액션 함수를 함께 정의할 수 있습니다. 이는 복잡한 상태 관리에
적합합니다.

```tsx
import { quark } from '@pasteltones/quark'

interface CountStore {
  count: number
  increment: () => void
  decrement: () => void
}

const useCount = quark<CountStore>(set => ({
  count: 0,
  increment: () => set(prev => ({ count: prev.count + 1 })),
  decrement: () => set(prev => ({ count: prev.count - 1 })),
}))

export function Counter() {
  const { count, increment, decrement } = useCount()
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}
```

위 예제에서 useCount는 Quark Store로, count 상태와 increment, decrement 액션을 정의합니다.

<!--  -->

## Selector를 이용한 렌더링 최적화

Quark는 selector를 사용하여 상태의 특정 부분만을 구독함으로써 렌더링을 최적화할 수 있습니다. 이는
불필요한 렌더링을 방지하여 성능을 향상시킵니다.

```tsx
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
```

위 예제에서 ChildComponent는 count 상태만을 구독하여, text 상태가 변경될 때 불필요한 렌더링을
방지합니다. 이와 같이 Quark는 다양한 방식으로 상태 관리를 지원하며, React 애플리케이션의 성능을
최적화할 수 있습니다. Quark를 사용하여 간단하고 효율적인 상태 관리를 경험해 보세요.
