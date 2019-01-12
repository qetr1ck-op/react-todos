// import { TodoFilters } from '../enums'
import { Actions, TodosActions } from '../../actions'
import { uuid } from '../../services/uuid'
import { Todo } from '../../types'

export interface TodosState {
  todos: Todo[]
  // isAllChecked: boolean
  // filters: TodoFilters[]
}

const initialState: TodosState = {
  todos: [{ value: 'Learn Redux', done: false, id: uuid() }],
}

export const TodosReducer = (state = initialState, action: TodosActions): TodosState => {
  switch (action.type) {
    case Actions.Add: {
      return {
        todos: [...state.todos, action.payload],
      }
    }
    case Actions.Edit: {
      return {
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, ...action.payload }
          }
          return todo
        }),
      }
    }
    case Actions.DeleteSingle: {
      return {
        todos: state.todos.filter(todo => todo.id !== action.payload)
      }
    }
    case Actions.DeleteDone: {
      return {
        todos: state.todos.filter(todo => !todo.done)
      }
    }
    case Actions.ToggleDoneStatusAll: {
      return {
        todos: state.todos.map(todo => ({...todo, done: action.payload}))
      }
    }

    default: {
      return state
    }
  }
}
