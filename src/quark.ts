import type { CreateState, QuarkOptions, QuarkStore, SingleQuarkStore, StoreApi } from './types'
import { SingleQuarkFactory } from './factory/single-quark-factory'
import { QuarkFactory } from './factory/quark-factory'

const isCreateState = <T>(store: CreateState<T> | T): store is CreateState<T> =>
  typeof store === 'function'

export function quark<T>(store: CreateState<T>): QuarkStore<StoreApi<T>>
export function quark<T>(
  store: CreateState<T>,
  options?: Partial<QuarkOptions>,
): QuarkStore<StoreApi<T>>
export function quark<T>(store: T, options?: Partial<QuarkOptions>): SingleQuarkStore<T>
export function quark<T>(store: CreateState<T> | T, options?: Partial<QuarkOptions>) {
  const factory = isCreateState(store) ? new QuarkFactory(store) : new SingleQuarkFactory(store)

  const quarkStore = factory.createGlobalStore(options)

  return quarkStore
}
