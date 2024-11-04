import { CreateState } from './types'

export const isCreateState = <T>(store: CreateState<T> | T): store is CreateState<T> =>
  typeof store === 'function'
