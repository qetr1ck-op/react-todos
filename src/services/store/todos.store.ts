import throttle from 'lodash/throttle'
import { createStore } from 'redux'

import { TodosReducer } from '../../components/todos'
import { loadState, saveState } from '../local-storage'

const initialState = loadState()

function configureStore(initialState?: object) {
  return createStore(TodosReducer, initialState)
}

export const store = configureStore(initialState)

store.subscribe(
  throttle(() => {
    saveState(store.getState().todos)
  }, 1000),
)
