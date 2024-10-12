export type Fn = () => void

export type Listener<T> = (state: T, prevState: T) => void

export type UpdateState<T> = Partial<T>
export type UpdateStateFn<T> = (state: T) => UpdateState<T>
export type SetState<T> = (partial: UpdateState<T> | UpdateStateFn<T>) => void

export interface StoreApi<T> {
  setState: SetState<T>
  getState: () => T
  getInitialState: () => T
  subscribe: (listener: Listener<T>) => () => void
}

export type CreateState<T> = (
  setState: StoreApi<T>['setState'],
  getState: StoreApi<T>['getState'],
  store: StoreApi<T>,
) => T

export type UseStoreReturn<T> = T & { reset: () => void }
export type UseQuark<T> = (() => UseStoreReturn<T>) & StoreApi<T>
