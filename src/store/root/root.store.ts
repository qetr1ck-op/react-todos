import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import loggerMiddleware from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'

import { todoReducer, TodoState } from '../../components/todos'
import { actionToPlainObject } from '../middlewares'

export interface RootState {
  todo: TodoState
}

const combineReducer = (state: RootState, action): RootState => {
  return {
    todo: todoReducer(state.todo, action),
  }
}
const configureStore = (initialState?: object) =>
  createStore(
    combineReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(loggerMiddleware, actionToPlainObject, promiseMiddleware()),
    ),
  )

export const store = configureStore({})
