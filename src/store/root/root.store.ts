import throttle from 'lodash/throttle'
import { applyMiddleware, createStore } from 'redux'
import loggerMiddleware from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'

import { todoReducer, TodoState } from '../../components/todos'
import { loadState, saveState } from '../../services/local-storage'
import { actionToPlainObject } from '../middlewares'

export interface RootState {
  todo: TodoState
}

const initialState = loadState()
const combineReducer = (state: RootState, action): RootState => {
  return {
    todo: todoReducer(state.todo, action),
  }
}
const configureStore = (initialState?: object) =>
  createStore(
    combineReducer,
    initialState,
    applyMiddleware(actionToPlainObject, loggerMiddleware, promiseMiddleware()),
  )

export const store = configureStore(initialState)

store.subscribe(
  throttle(() => {
    saveState(store.getState())
  }, 1000),
)
