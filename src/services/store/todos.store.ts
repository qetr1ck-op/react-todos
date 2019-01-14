import throttle from 'lodash/throttle'
import { Action, applyMiddleware, createStore, Store } from 'redux'

import { TodosReducer } from '../../components/todos'
import { loadState, saveState } from '../local-storage'

const initialState = loadState()

function configureStore(initialState?: object) {
  return createStore(TodosReducer, initialState, applyMiddleware(actionToPlainObject))
}

export const store = configureStore(initialState)

store.subscribe(
  throttle(() => {
    saveState(store.getState())
  }, 1000),
)

function actionToPlainObject(store: Store) {
  return (next) => (action: Action) => next({ ...action })
}
