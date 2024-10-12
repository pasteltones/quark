import type { CreateState, Listener, StoreApi, UpdateStateFn, SetState, Fn } from './types'

export class Quark<T> {
  private state: T
  private initialState: T
  private listeners: Set<Listener<T>>

  constructor(createState: CreateState<T>) {
    this.state = createState(this.setState, this.getState, this.api)
    this.initialState = this.state
    this.listeners = new Set()
  }

  static create<T>(createState: CreateState<T>) {
    return new Quark(createState)
  }

  notify = (state: T, prevState: T) => {
    this.listeners.forEach(listener => listener(state, prevState))
  }

  getState = () => {
    return this.state
  }

  setState: SetState<T> = partial => {
    const nextState = this.isUpdateFn<T>(partial) ? partial(this.state) : partial

    if (!Object.is(nextState, this.state)) {
      const prevState = this.state
      this.state = Object.assign({}, this.state, nextState)

      this.notify(this.state, prevState)
    }
  }

  subscribe: StoreApi<T>['subscribe'] = listener => {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  reset: Fn = () => {
    this.setState(this.initialState)
  }

  getInitialState = () => this.initialState

  isUpdateFn<T>(value: unknown): value is UpdateStateFn<T> {
    return typeof value === 'function'
  }

  get api(): StoreApi<T> {
    return {
      setState: this.setState,
      getState: this.getState,
      getInitialState: this.getInitialState,
      subscribe: this.subscribe,
    }
  }
}
