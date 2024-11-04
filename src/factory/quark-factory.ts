import { useQuark } from '../react'
import { Quark } from '../vanilla'
import type { CreateState, QuarkOptions, QuarkStore, StoreApi } from '../types'
import { QuarkStoreCreator } from './quark-store-creator.abstract'

export class QuarkStoreFactory extends QuarkStoreCreator {
  static override createGlobalStore<T>(store: CreateState<T>, options?: Partial<QuarkOptions>) {
    const quark = Quark.create(store, options)
    const useStore = <U>(selector: (state: T) => U = state => state as unknown as U) =>
      useQuark(quark.api, selector)

    Object.assign(useStore, quark.api)
    return useStore as QuarkStore<StoreApi<T>>
  }
}
