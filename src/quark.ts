import { Quark } from './vanilla'
import type {
  CreateState,
  ExtractState,
  QuarkStore,
  ReturnUseSingleQuark,
  SingleQuarkStore,
  StoreApi,
} from './types'
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector'
import { IsEqual, shallow } from './util'

export function useQuark<S extends StoreApi<unknown>>(store: S): ExtractState<S>
export function useQuark<S extends StoreApi<unknown>, U>(
  store: S,
  selector: (state: ExtractState<S>) => U,
  isEqual?: IsEqual<S>,
): U
export function useQuark<TState, U>(
  store: StoreApi<TState>,
  selector?: (state: TState) => U,
  isEqual?: IsEqual<U>,
) {
  const slice = useSyncExternalStoreWithSelector(
    store.subscribe,
    store.getState,
    store.getState,
    selector ?? (state => state as any),
    isEqual ?? shallow,
  )

  return slice
}

export function useSingleQuark<T>(
  store: Quark<T>,
  selector?: (state: T) => T,
  isEqual?: IsEqual<T>,
): ReturnUseSingleQuark<T> {
  const slice = useSyncExternalStoreWithSelector(
    store.subscribe,
    store.getState,
    store.getState,
    selector ?? (state => state),
    isEqual ?? shallow<T>,
  )

  const result: ReturnUseSingleQuark<T> = [slice, store.setState]
  return result
}

export function quark<T>(store: T): SingleQuarkStore<T>
export function quark<T>(store: CreateState<T>): QuarkStore<Quark<T>>
export function quark<T>(store: CreateState<T> | T) {
  const isProton = (store: unknown): store is CreateState<T> => typeof store === 'function'

  if (isProton(store)) {
    const quark = Quark.create(store)
    const useStore: any = (selector?: any) => useQuark(quark.api, selector)
    Object.assign(useStore, quark.api)
    return useStore as QuarkStore<typeof quark>
  }

  const quark = Quark.createSingleQuark(store)
  const useStore = () => useSingleQuark(quark)
  Object.assign(useStore, quark.api)
  return useStore as SingleQuarkStore<T>
}
