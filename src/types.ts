export type Fn = () => void

export type QuarkOptions = {
  as: 'global' | 'local'
}

export type Listener<T> = (state: T, prevState: T) => void

export type ExtractState<S> = S extends { getState: () => infer T } ? T : never

export type UpdateState<T> = Partial<T>
export type UpdateStateFn<T> = (state: T) => UpdateState<T>
export type SetState<T> = (partial: UpdateState<T> | UpdateStateFn<T>) => void
export type SetSingleState<T> = (partial: UpdateState<T>) => void

export interface StoreApi<T> {
  setState: SetState<T>
  getState: () => T
  getInitialState: () => T
  subscribe: (listener: Listener<T>) => Fn
  reset: () => void
  scope: 'global' | 'local'
}

export type CreateState<T> = (
  setState: StoreApi<T>['setState'],
  getState: StoreApi<T>['getState'],
  store: StoreApi<T>,
) => T

export type QuarkStore<S> = {
  (): ExtractState<S>
  <U>(selector: (state: ExtractState<S>) => U): U
} & S

export type ReturnUseSingleQuark<T> = [T, SetSingleState<T>]
export type SingleQuarkStore<T> = (() => ReturnUseSingleQuark<T>) & StoreApi<T>
