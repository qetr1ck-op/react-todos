import { Actions, ActionType } from '../../actions'
import { uuid } from '../../services/uuid'
import { Todo } from '../../types'

export interface TodosState {
  todos: Todo[]
}

const initialState: TodosState = {
  todos: [{ value: 'Learn Redux', done: false, id: uuid() }],
}

export const TodosReducer = (state = initialState, action: Actions): TodosState => {
  switch (action.type) {
    case ActionType.Add: {
      return {
        todos: [...state.todos, { value: action.payload.value, id: uuid(), done: false }],
      }
    }
    case ActionType.Edit: {
      return {
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, ...action.payload }
          }
          return todo
        }),
      }
    }
    case ActionType.DeleteOne: {
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      }
    }
    case ActionType.DeleteAll: {
      return {
        todos: state.todos.filter((todo) => !todo.done),
      }
    }
    case ActionType.ToggleStatusAll: {
      return {
        todos: state.todos.map((todo) => ({ ...todo, done: action.payload.done })),
      }
    }

    default: {
      return state
    }
  }
}
