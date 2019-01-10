// import { TodoFilters } from '../enums'
import { Actions, TodosAction } from '../actions'
import { uuid } from '../services/uuid'
import { Todo } from '../types'

interface TodosState {
  todos: Todo[]
  // filters: TodoFilters[]
  // isAllChecked: boolean
}

const initialState: TodosState = {
  todos: [{ value: 'Learn Redux', done: false, id: uuid() }],
}

const TodosReducer = (state = initialState, action: TodosAction): TodosState => {
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

    default: {
      return state
    }
  }
}
