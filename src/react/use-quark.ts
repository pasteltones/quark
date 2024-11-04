import type { ExtractState, StoreApi } from '../types'
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector'
import { IsEqual, shallow } from '../util'

export function useQuark<S>(store: S): ExtractState<S>
export function useQuark<S, U>(
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
