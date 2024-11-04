import { Quark } from '../vanilla'
import type { ReturnUseSingleQuark } from '../types'
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector'
import { IsEqual, shallow } from '../util'

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
