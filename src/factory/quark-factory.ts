import { useQuark } from '../react'
import { Quark } from '../vanilla'
import type { CreateState, QuarkOptions, QuarkStore, StoreApi } from '../types'
import type { IQuarkFactory } from './quark-factory.interface'

export class QuarkFactory<T> implements IQuarkFactory<StoreApi<T>> {
  constructor(private store: CreateState<T>) {}

  createGlobalStore(options?: Partial<QuarkOptions>) {
    const quark = Quark.create(this.store, options)
    const useStore = <U>(selector: (state: T) => U = state => state as unknown as U) =>
      useQuark(quark.api, selector)

    Object.assign(useStore, quark.api)
    return useStore as QuarkStore<StoreApi<T>>
  }
}
