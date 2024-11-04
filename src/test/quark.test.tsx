import React from 'react'
import { describe, it, expect } from 'vitest'
import { renderHook, act, render, fireEvent, cleanup, getByTestId } from '@testing-library/react'
import { quark } from '../quark'
import { useQuark } from '../react'
import { QuarkStore, StoreApi } from 'src/types'

describe('quark', () => {
  it('creates a single value Quark and checks initial state | 단일 값 쿼크를 생성하고 초기 상태를 확인해야 한다', () => {
    const useCounter = quark(0)

    const state = useCounter.getState()

    expect(state).toBe(0)
  })

  it('should create a Quark with object state and verify initial state | 객체 상태를 가진 쿼크를 생성하고 초기 상태를 확인해야 한다', () => {
    interface Store {
      count: number
      increment: () => void
    }
    const useStore = quark<Store>(set => ({
      count: 0,
      increment: () => set(state => ({ count: state.count + 1 })),
    }))

    const state = useStore.getState()

    expect(state.count).toBe(0)
  })
})

describe('useQuark', () => {
  it('should create a Quark store and use useQuark to select a specific state | Quark 스토어를 생성하고 useQuark를 사용하여 특정 상태를 선택해야 한다', () => {
    const useStore = quark({ count: 0, text: 'hello' })
    const { result } = renderHook(() => {
      const count = useQuark(useStore, state => state.count)
      return { count }
    })

    expect(result.current.count).toBe(0)
  })

  it('The default value of scope is "global" | scope의 기본값은 "global"이다', () => {
    const useStore = quark({ count: 0 })

    expect(useStore.scope).toBe('global')
  })
})

describe('useSingleQuark', () => {
  it('should create a single value Quark, use it in a hook, and update its value | 단일 값 쿼크를 생성하고, 훅에서 사용하며, 값을 업데이트해야 한다', () => {
    const useCounter = quark(0)
    const { result } = renderHook(() => {
      const [count, setCount] = useCounter()
      return { count, setCount }
    })

    expect(result.current.count).toBe(0)

    act(() => result.current.setCount(1))

    expect(result.current.count).toBe(1)
  })

  describe('render count', () => {
    let ParentComponent = () => <div />
    let ChildComponent = () => <div />
    interface Store {
      count: number
      text: string
      incrementCount: () => void
      setText: (text: string) => void
    }
    let useStore: QuarkStore<StoreApi<Store>>
    let parentRenderCount = 0
    let childRenderCount = 0

    beforeEach(() => {
      useStore = quark<Store>(set => ({
        count: 0,
        text: 'hello',
        incrementCount: () => set(state => ({ count: state.count + 1 })),
        setText: (text: string) => set({ text }),
      }))
    })

    afterEach(() => {
      cleanup()
      parentRenderCount = 0
      childRenderCount = 0
    })

    it('Parent and child components should optimize render count when using selectors | 선택자를 사용할 때 부모와 자식 컴포넌트의 렌더링 횟수가 최적화되어야 한다', () => {
      ChildComponent = () => {
        const count = useStore(state => state.count)

        ++childRenderCount

        return (
          <div>
            <h2>Child Component</h2>
            <p data-testid='count'>{count}</p>
          </div>
        )
      }

      ParentComponent = () => {
        const { text, incrementCount, setText } = useStore(state => ({
          text: state.text,
          incrementCount: state.incrementCount,
          setText: state.setText,
        }))

        ++parentRenderCount

        return (
          <div>
            <h1>Parent Component</h1>
            <button onClick={incrementCount} data-testid='add-count'>
              add count
            </button>
            <input
              data-testid='text-input'
              type='text'
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder='input text'
            />
            <ChildComponent />
          </div>
        )
      }

      const { container } = render(<ParentComponent />)
      const countElement = getByTestId(container, 'count') as HTMLParagraphElement
      const countButtonElement = getByTestId(container, 'add-count') as HTMLButtonElement
      const textInputElement = getByTestId(container, 'text-input') as HTMLInputElement

      expect(countElement.textContent).toBe('0')
      expect(parentRenderCount).toBe(1)
      expect(childRenderCount).toBe(1)

      act(() => {
        fireEvent.click(countButtonElement)
      })

      expect(countElement.textContent).toBe('1')
      expect(parentRenderCount).toBe(1)
      expect(childRenderCount).toBe(2)

      act(() => {
        fireEvent.change(textInputElement, { target: { value: 'h' } })
      })

      expect(textInputElement.value).toBe('h')
      expect(parentRenderCount).toBe(2)
      expect(childRenderCount).toBe(3)
    })

    it('When used without selectors, render count should increase regardless of parent-child relationship according to state changes | 선택자 없이 사용할 때 상태 변화에 따라서 부모 자식 관계 없이 렌더링 횟수가 증가 하여야 한다', () => {
      ChildComponent = () => {
        const { count } = useStore()

        ++childRenderCount

        return (
          <div>
            <h2>Child Component</h2>
            <p data-testid='count'>{count}</p>
          </div>
        )
      }

      ParentComponent = () => {
        const { text, incrementCount, setText } = useStore()

        ++parentRenderCount

        return (
          <div>
            <h1>Parent Component</h1>
            <button onClick={incrementCount} data-testid='add-count'>
              add count
            </button>
            <input
              data-testid='text-input'
              type='text'
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder='input text'
            />
            <ChildComponent />
          </div>
        )
      }

      const { container } = render(<ParentComponent />)
      const countElement = getByTestId(container, 'count') as HTMLParagraphElement
      const countButtonElement = getByTestId(container, 'add-count') as HTMLButtonElement
      const textInputElement = getByTestId(container, 'text-input') as HTMLInputElement

      expect(countElement.textContent).toBe('0')
      expect(parentRenderCount).toBe(1)
      expect(childRenderCount).toBe(1)

      act(() => {
        fireEvent.click(countButtonElement)
      })

      expect(countElement.textContent).toBe('1')
      expect(parentRenderCount).toBe(2)
      expect(childRenderCount).toBe(2)

      act(() => {
        fireEvent.change(textInputElement, { target: { value: 'h' } })
      })

      expect(textInputElement.value).toBe('h')
      expect(parentRenderCount).toBe(3)
      expect(childRenderCount).toBe(3)
    })
  })
})
