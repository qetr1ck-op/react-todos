import { toDictionary } from '@root/services'

import { Todo, TodoFilter } from '../../../models'
import { ActionType, ActionTypes } from '../../actions'

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
export const todoReducer = (state = initialState, action: ActionTypes): TodoState => {
  switch (action.type) {
    case ActionType.GetLoading: {
      return { ...state, isLoading: true }
    }
    case ActionType.GetSuccess:

    case ActionType.UpdateSuccess:
    case ActionType.UpdateLoading:
    case ActionType.UpdateError:

    case ActionType.DeleteOneLoading:
    case ActionType.DeleteOneSuccess:
    case ActionType.DeleteOneError:

    case ActionType.DeleteAllLoading:
    case ActionType.DeleteAllSuccess:

    case ActionType.ToggleStatusAll: {
      return {
        ...state,
        isLoading: false,
        todos: toDictionary(action.payload, 'id'),
      }
    }

    case ActionType.AddLoading:
    case ActionType.AddSuccess: {
      return {
        ...state,
        isAddLoading: false,
        todos: { ...state.todos, [action.payload.id]: action.payload },
      }
    }
    default: {
      return state
    }
  }
}
