import { useSingleQuark } from '../react'
import { Quark } from '../vanilla'
import type { QuarkOptions, SingleQuarkStore } from '../types'
import { QuarkStoreCreator } from './quark-store-creator.abstract'

export class SingleQuarkStoreFactory extends QuarkStoreCreator {
  static override createGlobalStore<T>(store: T, options?: Partial<QuarkOptions>) {
    const quark = Quark.createSingle(store, options)
    const useStore = () => useSingleQuark(quark)

    Object.assign(useStore, quark.api)
    return useStore as SingleQuarkStore<T>
  }
}
