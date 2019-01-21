import { TodoFilter } from '../../../enums'
// import { uuid } from '../../../services'
import { Todo } from '../../../types'
import { TodoActions, TodoActionType } from '../../actions'

export interface TodoState {
  todos: Todo[]
  filter: TodoFilter
  isLoading: boolean
  isAddLoading: boolean
  error: string
}

const initialState: TodoState = {
  todos: [],
  filter: TodoFilter.All,
  isLoading: false,
  isAddLoading: false,
  error: ''
}
export const todoReducer = (state = initialState, action: TodoActions): TodoState => {
  switch (action.type) {
    case TodoActionType.GetLoading: {
      return { ...state, isLoading: true }
    }
    case TodoActionType.GetSuccess:
    case TodoActionType.UpdateSuccess:  {
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
      }
    }

    case TodoActionType.AddLoading: {
      return { ...state, isAddLoading: true }
    }
    case TodoActionType.AddSuccess: {
      return { ...state, isAddLoading: false, todos: [...state.todos, action.payload] }
    }

    case TodoActionType.DeleteOne: {
      /*return {
        filter: state.filter,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      }*/
    }
    case TodoActionType.DeleteAll: {
      /*return {
        filter: state.filter,
        todos: state.todos.filter((todo) => !todo.done),
      }*/
    }
    case TodoActionType.ToggleStatusAll: {
      /*return {
        filter: state.filter,
        todos: state.todos.map((todo) => ({ ...todo, done: action.payload.done })),
      }*/
    }
    case TodoActionType.FilterChange: {
      // return { filter: action.payload.filter, todos: state.todos }
    }

    default: {
      return state
    }
  }
}
