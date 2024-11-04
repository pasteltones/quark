import type { QuarkOptions, SingleQuarkStore } from '../types'
import type { QuarkStore } from '../types'

export interface IQuarkFactory<T> {
  createGlobalStore(options?: Partial<QuarkOptions>): QuarkStore<T> | SingleQuarkStore<T>
}
