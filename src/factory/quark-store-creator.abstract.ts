import { QuarkOptions } from '../types'
import { CreateState } from '../types'

// Meh, it's fine. This abstract class isn't used standalone anyway
export abstract class QuarkStoreCreator {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static createGlobalStore<T>(_store: CreateState<T> | T, _options?: Partial<QuarkOptions>) {
    throw new Error('Must be implemented by subclass')
  }
}
