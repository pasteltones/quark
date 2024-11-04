import type {
  QuarkOptions,
  CreateState,
  Listener,
  StoreApi,
  UpdateStateFn,
  SetState,
} from './types'

export class Quark<T> {
  private state: T
  private initialState: T
  private listeners: Set<Listener<T>>
  private options: QuarkOptions = { as: 'global' }

  constructor(createState: CreateState<T>, options?: Partial<QuarkOptions>) {
    this.state = createState(this.setState, this.getState, this.api)
    this.initialState = this.state
    this.listeners = new Set()
    this.options = { ...this.options, ...options }
  }

  static create<T>(createState: CreateState<T>, options?: Partial<QuarkOptions>) {
    return new Quark(createState, options)
  }

  static createSingle<T>(value: T, options?: Partial<QuarkOptions>) {
    return new Quark(() => value, options)
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
      this.state =
        typeof nextState === 'object' && nextState !== null
          ? Object.assign({}, this.state, nextState)
          : (nextState as T)

      this.notify(this.state, prevState)
    }
  }

  subscribe: StoreApi<T>['subscribe'] = listener => {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  reset = () => {
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
      reset: this.reset,
      scope: this.options.as,
    }
  }
}
