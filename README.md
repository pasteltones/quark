# Quark

Quark is a state management library that helps manage state in React applications easily and efficiently. Quark is lightweight, easy to use, and provides powerful features for complex state management requirements.

> ⚠️ This library is currently under development and does not include test code. It is important to perform additional testing before using it in a production environment. We recommend setting up your own tests or using it on a limited basis in the early stages to ensure stability.

## Features

- **Simple API**: Quark offers a simple and intuitive API for state management.
- **Type Safety**: Quark provides type safety for state, ensuring consistency at all times.

## Installation

To install Quark, run the following command:

```bash
npm install @pasteltones/quark
yarn add @pasteltones/quark
pnpm add @pasteltones/quark
bun add @pasteltones/quark
```

# Usage

Quark is a library that helps manage state easily and efficiently in React applications. Quark offers two main usage patterns: Single Quark and Quark Store. This document explains how to use Quark through examples.

<!--  -->

## Single Quark

Single Quark manages a single state value in a manner similar to useState. It is suitable for simple state management and works similarly to jotai, recoil, or sangte.

```tsx
import { quark } from '@pasteltones/quark'

const useName = quark('John')

function Name() {
  const [name, setName] = useName()
  return <input type='text' value={name} onChange={e => setName(e.target.value)} />
}
```

In the example above, useName is a Single Quark that manages the name state. The setName function allows updating the state.

<!--  -->

## Quark Store

Quark Store allows defining state and action functions together, similar to zustand. It is suitable for complex state management.

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

In the example above, useCount is a Quark Store that defines the count state and increment, decrement actions.

<!--  -->

## Rendering Optimization with Selectors

Quark can optimize rendering by subscribing to only specific parts of the state using selectors. This prevents unnecessary rendering and improves performance.

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

  console.log('ChildComponent rendering')

  return (
    <div>
      <h2>Child Component</h2>
      <p>Count value: {count}</p>
    </div>
  )
}
```

In the example above, ChildComponent subscribes only to the count state, preventing unnecessary rendering when the text state changes. In this way, Quark supports various methods of state management and can optimize the performance of React applications. Experience simple and efficient state management with Quark.