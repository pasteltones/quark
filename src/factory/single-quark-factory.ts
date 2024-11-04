import { useSingleQuark } from '../react'
import { Quark } from '../vanilla'
import type { QuarkOptions, SingleQuarkStore } from '../types'
import type { IQuarkFactory } from './quark-factory.interface'

export class SingleQuarkFactory<T> implements IQuarkFactory<T> {
  constructor(private store: T) {}

  createGlobalStore(options?: Partial<QuarkOptions>) {
    const quark = Quark.createSingle(this.store, options)
    const useStore = () => useSingleQuark(quark)

    Object.assign(useStore, quark.api)
    return useStore as SingleQuarkStore<T>
  }
}
