import React, { useState } from 'react'
import { act, cleanup, fireEvent, getByTestId, render, renderHook } from '@testing-library/react'
import { useQuarkLocal } from '../react'
import type { CreateState } from '../types'

describe('useQuarkLocal', () => {
  it('useState 테스트', () => {
    const { result } = renderHook(() => useState(0))

    expect(result.current[0]).toBe(0)

    act(() => {
      result.current[1](10)
    })

    expect(result.current[0]).toBe(10)
  })

  it('Local state created with useQuarkLocal should work properly | useQuarkLocal로 생성한 지역상태가 정상적으로 동작해야 한다.', () => {
    interface IStore {
      count: number
      setCount: (count: number) => void
      increment: () => void
    }
    const { result } = renderHook(() =>
      useQuarkLocal<IStore>(set => ({
        count: 0,
        setCount: count => set({ count }),
        increment: () => set(state => ({ count: state.count + 1 })),
      })),
    )

    expect(result.current.count).toBe(0)

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })

  it('scope should be "local" | scope는 "local"이어야 한다.', () => {
    interface IStore {
      count: number
      increment: () => void
    }

    const { result } = renderHook(() =>
      useQuarkLocal<IStore>(set => ({
        count: 0,
        increment: () => set(state => ({ count: state.count + 1 })),
      })),
    )

    expect(result.current.scope).toBe('local')
  })

  describe('with component', () => {
    let ParentComponent = () => <div />
    let ChildComponent = () => <div />
    interface CounterState {
      count: number
      increment: () => void
    }

    beforeEach(() => {
      const countStore: CreateState<CounterState> = set => ({
        count: 0,
        increment: () => set(state => ({ count: state.count + 1 })),
      })

      ChildComponent = () => {
        const { count, increment } = useQuarkLocal(countStore)

        return (
          <>
            <p data-testid='child-value'>{count}</p>
            <button onClick={increment} data-testid='child-increment'>
              increment
            </button>
          </>
        )
      }

      ParentComponent = () => {
        const { count, increment } = useQuarkLocal(countStore)

        return (
          <>
            <p data-testid='parent-value'>{count}</p>
            <button onClick={increment} data-testid='parent-increment'>
              increment
            </button>
          </>
        )
      }
    })

    afterEach(() => {
      cleanup()
    })

    it('should be independent in different components | 로컬 상태이므로 서로 다른 컴포넌트에서 독립적으로 동작해야 한다.', () => {
      const { container: parentContainer } = render(<ParentComponent />)
      const { container: childContainer } = render(<ChildComponent />)

      const parentCount = getByTestId(parentContainer, 'parent-value') as HTMLParagraphElement
      const parentIncrement = getByTestId(parentContainer, 'parent-increment') as HTMLButtonElement
      const childCount = getByTestId(childContainer, 'child-value') as HTMLParagraphElement
      const childIncrement = getByTestId(childContainer, 'child-increment') as HTMLButtonElement

      expect(parentCount.textContent).toBe('0')
      expect(childCount.textContent).toBe('0')

      act(() => {
        fireEvent.click(parentIncrement)
      })

      expect(parentCount.textContent).toBe('1')
      expect(childCount.textContent).toBe('0')

      act(() => {
        fireEvent.click(childIncrement)
      })

      expect(parentCount.textContent).toBe('1')
      expect(childCount.textContent).toBe('1')
    })
  })
})
