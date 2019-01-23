import { Action, ActionCreator, Dispatch } from 'redux'

import { RootState } from '../../../../../store/root'
import { TodoFilter } from '../../../enums'
import { TodosApiService } from '../../../services/api'
import { uuidByDate } from '../../../services/uuid'
import { Todo } from '../../../types'
import { getTodoList } from '../../selectors/todo'

export enum ActionType {
  Get = '[TODO] GET',
  GetLoading = '[TODO] GET_PENDING',
  GetSuccess = '[TODO] GET_FULFILLED',

  Add = '[TODO] ADD',
  AddLoading = '[TODO] ADD_PENDING',
  AddSuccess = '[TODO] ADD_FULFILLED',
  AddError = '[TODO] ADD_REJECTED',

  DeleteOne = '[TODO] DELETE_SINGLE',
  DeleteAll = '[TODO] DELETE_ALL',

  Update = '[TODO] UPDATE',
  UpdateSuccess = '[TODO] UPDATE_FULFILLED',
  UpdateLoading = '[TODO] UPDATE_PENDING',
  UpdateError = '[TODO] UPDATE_REJECTED',

  ToggleStatusAll = '[TODO] TOGGLE_STATUS_ALL',
  FilterChange = '[TODO] FILTER_CHANGE',
}

// region Action Interfaces
interface GetAction extends Action {
  type: ActionType.Get
  payload: Promise<Todo[]>
}

interface GetLoadingAction extends Action {
  type: ActionType.GetLoading
}

interface GetSuccessAction extends Action {
  type: ActionType.GetSuccess
  payload: Todo[]
}

interface AddAction extends Action {
  type: ActionType.Add
  payload: Promise<Todo>
}

interface AddLoadingAction extends Action {
  type: ActionType.AddLoading
  payload: Todo
}

interface AddErrorAction extends Action {
  type: ActionType.AddError
  payload: Todo[]
}

interface AddSuccessAction extends Action {
  type: ActionType.AddSuccess
  payload: Todo
}

interface DeleteOneAction extends Action {
  type: ActionType.DeleteOne
  payload: Todo
}

interface DeleteAllDoneAction extends Action {
  type: ActionType.DeleteAll
}

interface UpdateAction extends Action {
  type: ActionType.Update
  payload: Promise<Todo[]>
}

interface UpdateSuccess extends Action {
  type: ActionType.UpdateSuccess
  payload: Todo[]
}

interface UpdateLoading extends Action {
  type: ActionType.UpdateLoading
  payload: Todo[]
}

interface UpdateError extends Action {
  type: ActionType.UpdateError
  payload: Todo[]
}

interface ToggleDoneStatusAllAction extends Action {
  type: ActionType.ToggleStatusAll
  payload: { done: boolean }
}

interface ChangeFilterAction extends Action {
  type: ActionType.FilterChange
  payload: { filter: TodoFilter }
}

export type ActionTypes =
  | GetAction
  | GetLoadingAction
  | GetSuccessAction
  | AddAction
  | AddLoadingAction
  | AddErrorAction
  | AddSuccessAction
  | DeleteOneAction
  | DeleteAllDoneAction
  | UpdateAction
  | UpdateSuccess
  | UpdateLoading
  | UpdateError
  | ToggleDoneStatusAllAction
  | ChangeFilterAction

// endregion

const apiService = new TodosApiService()

export const get: ActionCreator<GetAction> = () => ({
  type: ActionType.Get,
  payload: apiService.getAll(),
})

export const getLoading: ActionCreator<GetLoadingAction> = () => ({
  type: ActionType.GetLoading,
})

export const getSuccess: ActionCreator<GetSuccessAction> = (payload: Todo[]) => ({
  type: ActionType.GetSuccess,
  payload,
})

export const add = (payload: { value: string }) => (
  dispatch: Dispatch<ActionTypes>,
  getState: () => RootState,
) => {
  const initialTodos = getTodoList(getState())
  const newTodo = { value: payload.value, id: uuidByDate(), done: false }

  dispatch(addLoading(newTodo))
  apiService
    .addSingle(newTodo)
    .then((todo) => dispatch(addSuccess(todo)))
    .catch(() => dispatch(addError(initialTodos)))
}

export const addLoading: ActionCreator<AddLoadingAction> = (payload: Todo) => ({
  type: ActionType.AddLoading,
  payload
})

export const addSuccess: ActionCreator<AddSuccessAction> = (payload: Todo) => ({
  type: ActionType.AddSuccess,
  payload,
})

export const addError: ActionCreator<AddErrorAction> = (payload: Todo[]) => ({
  type: ActionType.AddError,
  payload,
})

export const deleteOne: ActionCreator<DeleteOneAction> = (payload: Todo) => ({
  type: ActionType.DeleteOne,
  payload,
})

export const deleteAllDone: ActionCreator<DeleteAllDoneAction> = () => ({
  type: ActionType.DeleteAll,
})

export const update = (payload: Partial<Todo>) => async (
  dispatch: Dispatch<any>,
  getState: () => RootState,
) => {
  const todos = getTodoList(getState())
  const updatedTodos = todos.map((todo) => {
    if (todo.id === payload.id) {
      return { ...todo, ...payload }
    }
    return todo
  })
  dispatch(updateLoading(updatedTodos))

  apiService
    .editSingle(payload)
    .then((todos) => dispatch(updateSuccess(todos)))
    .catch(() => dispatch(updateError(todos)))
}

export const updateSuccess: ActionCreator<UpdateSuccess> = (payload: Todo[]) => ({
  type: ActionType.UpdateSuccess,
  payload,
})

export const updateLoading: ActionCreator<UpdateLoading> = (payload: Todo[]) => ({
  type: ActionType.UpdateLoading,
  payload,
})

export const updateError: ActionCreator<UpdateError> = (payload: Todo[]) => ({
  type: ActionType.UpdateError,
  payload,
})

export const toggleDoneStatusAll: ActionCreator<ToggleDoneStatusAllAction> = (payload) => ({
  type: ActionType.ToggleStatusAll,
  payload,
})

export const changeFilter: ActionCreator<ChangeFilterAction> = (payload) => ({
  type: ActionType.FilterChange,
  payload,
})
