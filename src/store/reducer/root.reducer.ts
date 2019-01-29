import { todoReducer } from '@root/components/todos'
import { StateType } from 'typesafe-actions'

export const rootReducer = (state, action) => {
  return {
    todo: todoReducer(state.todo, action),
    // TODO: router with combineReducer
  }
}

export type RootState = StateType<typeof rootReducer>
