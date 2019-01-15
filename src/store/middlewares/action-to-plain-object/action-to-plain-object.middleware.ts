import { Action, Store } from 'redux'

export function actionToPlainObject(store: Store) {
  return (next) => (action: Action) => next({ ...action })
}
