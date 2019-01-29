import { RootAction, RootService, RootState } from '@root/store'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import loggerMiddleware from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import thunk from 'redux-thunk'
import { StateType } from 'typesafe-actions'

import { rootEpic } from '@root/store/epic'
import { rootService } from '@root/store/service'
import { rootReducer } from '../reducer'

import { actionToPlainObject } from '../middlewares'

export const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, RootService>({
  dependencies: rootService,
})

const configureStore = (initialState?: object) =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk, actionToPlainObject, epicMiddleware, loggerMiddleware),
    ),
  )

export const store = configureStore({})
export type RootStore = StateType<typeof store>

epicMiddleware.run(rootEpic)
