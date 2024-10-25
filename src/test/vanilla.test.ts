import { Quark } from '../vanilla'

describe('Quark', () => {
  it('should return the same value from getState as the initial state when no changes have occurred | 상태 변화가 일어나지 않은 경우 getState 반환값과 초기값이 같아야 한다', () => {
    const initialState = { count: 0 }
    const quark = Quark.create(() => initialState)

    const state = quark.getState()

    expect(state).toEqual(initialState)
  })

  it('should update the state when using setState | setState를 사용하여 상태 업데이트시 상태가 변경되어야 한다', () => {
    const quark = Quark.create(() => ({ count: 0 }))

    quark.setState({ count: 1 })

    expect(quark.getState()).toEqual({ count: 1 })

    quark.setState(state => ({ count: state.count + 1 }))

    expect(quark.getState()).toEqual({ count: 2 })
  })

  it('should create a Quark instance with complex state and action methods and verify its functionality | 복잡한 상태와 액션 메서드를 가진 Quark 인스턴스를 생성하고 그 기능을 검증해야 한다', () => {
    interface QuarkStore {
      count: number
      increment: () => void
      getSquareCount: () => number
    }
    const quark = Quark.create<QuarkStore>((set, get) => ({
      count: 0,
      increment: () => set(state => ({ count: state.count + 1 })),
      getSquareCount: () => get().count * get().count,
    }))

    expect(quark.getState().count).toBe(0)

    quark.getState().increment()

    expect(quark.getState().count).toBe(1)

    quark.getState().increment()

    expect(quark.getState().count).toBe(2)
    expect(quark.getState().getSquareCount()).toBe(4)
  })

  it('should subscribe to a listener and receive notifications on state changes | 리스너를 구독하고 상태 변경 시 알림을 받아야 한다', () => {
    const listener = vi.fn()
    const quark = Quark.create(() => ({ count: 0 }))

    const unsubscribe = quark.subscribe(listener)
    quark.setState({ count: 1 })

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toHaveBeenCalledWith({ count: 1 }, { count: 0 })

    unsubscribe()
    quark.setState({ count: 2 })

    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('should not be called a listener if new state identity is the same | 새로운 상태의 아이덴티티가 동일한 경우 리스너가 호출되지 않아야 한다', () => {
    const listener = vi.fn()
    const initialState = { count: 1, text: 'a' }
    const quark = Quark.create(() => initialState)

    quark.subscribe(listener)
    quark.setState(initialState)
    expect(listener).not.toHaveBeenCalled()
  })

  it('should update to the initial state using the reset function | reset 함수를 사용하여 초기 상태로 업데이트 되어야 한다', () => {
    const initialState = { count: 0 }
    const quark = Quark.create(() => initialState)

    quark.setState({ count: 5 })

    expect(quark.getState()).toEqual({ count: 5 })

    quark.reset()

    expect(quark.getState()).toEqual(initialState)
  })

  it('should create and update a Quark with a single value | 단일 값을 가진 Quark를 생성하고 업데이트해야 한다', () => {
    const singleQuark = Quark.createSingle(10)

    expect(singleQuark.getState()).toBe(10)

    singleQuark.setState(20)

    expect(singleQuark.getState()).toBe(20)
  })

  it('should handle null state updates correctly | null 상태 업데이트를 올바르게 처리해야 한다', () => {
    const quark = Quark.createSingle<string | null>('test')

    quark.setState(null)

    expect(quark.getState()).toBe(null)
  })
})
