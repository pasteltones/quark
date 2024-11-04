import type { CreateState, QuarkOptions, QuarkStore, SingleQuarkStore, StoreApi } from './types'
import { SingleQuarkStoreFactory } from './factory/single-quark-factory'
import { QuarkStoreFactory } from './factory/quark-factory'
import { isCreateState } from './helpers'

export function quark<T>(store: CreateState<T>): QuarkStore<StoreApi<T>>
export function quark<T>(
  store: CreateState<T>,
  options?: Partial<QuarkOptions>,
): QuarkStore<StoreApi<T>>
export function quark<T>(store: T, options?: Partial<QuarkOptions>): SingleQuarkStore<T>
export function quark<T>(store: CreateState<T> | T, options?: Partial<QuarkOptions>) {
  // Could be more factory-pattern-ish, but let's keep it practical
  return isCreateState(store)
    ? QuarkStoreFactory.createGlobalStore(store, options)
    : SingleQuarkStoreFactory.createGlobalStore(store, options)
}
