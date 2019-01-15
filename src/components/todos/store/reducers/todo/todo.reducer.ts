import { TodoFilter } from '../../../enums'
import { uuid } from '../../../services'
import { Todo } from '../../../types'
import { TodoActions, TodoActionType } from '../../actions'

export interface TodoState {
  todos: Todo[]
  filter: TodoFilter
}

const initialState: TodoState = {
  todos: [{ value: 'Learn Redux', done: false, id: uuid() }],
  filter: TodoFilter.All,
}

export const todoReducer = (state = initialState, action: TodoActions): TodoState => {
  switch (action.type) {
    case TodoActionType.Add: {
      return {
        filter: state.filter,
        todos: [...state.todos, { value: action.payload.value, id: uuid(), done: false }],
      }
    }
    case TodoActionType.Edit: {
      return {
        filter: state.filter,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, ...action.payload }
          }
          return todo
        }),
      }
    }
    case TodoActionType.DeleteOne: {
      return {
        filter: state.filter,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      }
    }
    case TodoActionType.DeleteAll: {
      return {
        filter: state.filter,
        todos: state.todos.filter((todo) => !todo.done),
      }
    }
    case TodoActionType.ToggleStatusAll: {
      return {
        filter: state.filter,
        todos: state.todos.map((todo) => ({ ...todo, done: action.payload.done })),
      }
    }
    case TodoActionType.FilterChange: {
      return { filter: action.payload.filter, todos: state.todos }
    }

    default: {
      return state
    }
  }
}
