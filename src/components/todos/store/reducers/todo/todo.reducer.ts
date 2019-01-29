import { toDictionary, toList, uuidByDate } from '@root/services'
import { RootAction } from '@root/store'
import { getType } from 'typesafe-actions'

import { Todo, TodoFilter } from '../../../models'
import * as actions from '../../actions'

export interface TodoState {
  todos: TodoDictionary
  filter: TodoFilter
  isLoading: boolean
  isAddLoading: boolean
  error: string
}

export interface TodoDictionary {
  [id: string]: Todo
}

const initialState: TodoState = {
  todos: {},
  filter: TodoFilter.All,
  isLoading: false,
  isAddLoading: false,
  error: '',
}

// TODO: errors
// TODO: list to dictionary?
export const todoReducer = (state = initialState, action: RootAction): TodoState => {
  switch (action.type) {
    case getType(actions.getAll.success):
    case getType(actions.add.success):
    case getType(actions.removeDoneAll.success): {
      return {
        ...state,
        isLoading: false,
        isAddLoading: false,
        todos: toDictionary(action.payload, 'id'),
      }
    }

    case getType(actions.update.request): {
      const todos = state.todos
      todos[action.payload.id] = { ...action.payload }

      return { ...state, todos }
    }

    case getType(actions.getAll.request): {
      return { ...state, isLoading: true }
    }

    case getType(actions.removeDoneAll.request): {
      const todos = toList(state.todos).filter((todo) => !todo.done)

      return { ...state, todos: toDictionary(todos, 'id') }
    }

    case getType(actions.add.request): {
      const newTodo = { ...action.payload, id: uuidByDate() } as Todo
      const todos = { ...state.todos, [newTodo.id]: newTodo }

      return { ...state, isAddLoading: true, todos }
    }

    case getType(actions.remove.request): {
      const todos = { ...state.todos }
      delete todos[action.payload.id]

      return { ...state, todos }
    }

    case getType(actions.toggleDoneStatusAll): {
      const todos = toList({ ...state.todos }).map((todo) => ({
        ...todo,
        done: action.payload.done,
      }))

      return {
        ...state,
        isLoading: false,
        todos: toDictionary(todos, 'id'),
      }
    }

    default: {
      return state
    }
  }
}
