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

  DeleteOne = '[TODO] DELETE_ONE',
  DeleteOneLoading = '[TODO] DELETE_ONE_PENDING',
  DeleteOneSuccess = '[TODO] DELETE_ONE_FULFILLED',
  DeleteOneError = '[TODO] DELETE_ONE_REJECTED',

  DeleteAll = '[TODO] DELETE_ALL',
  DeleteAllLoading = '[TODO] DELETE_ALL_PENDING',
  DeleteAllSuccess = '[TODO] DELETE_ALL_FULFILLED',
  DeleteAllError = '[TODO] DELETE_ALL_ERROR',

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
  payload: Partial<Todo>
}

interface DeleteOneLoading extends Action {
  type: ActionType.DeleteOneLoading
  payload: Todo[]
}

interface DeleteOneSuccess extends Action {
  type: ActionType.DeleteOneSuccess
  payload: Todo[]
}

interface DeleteOneError extends Action {
  type: ActionType.DeleteOneError
  payload: Todo[]
}

interface DeleteAllDoneAction extends Action {
  type: ActionType.DeleteAll
}

interface DeleteAllDoneLoadingAction extends Action {
  type: ActionType.DeleteAllLoading
  payload: Todo[]
}

interface DeleteAllDoneSuccessAction extends Action {
  type: ActionType.DeleteAllSuccess
  payload: Todo[]
}

interface DeleteAllDoneErrorAction extends Action {
  type: ActionType.DeleteAllError
  payload: Todo[]
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
  payload: Todo[]
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
  | DeleteOneLoading
  | DeleteOneSuccess
  | DeleteOneError
  | DeleteAllDoneAction
  | DeleteAllDoneLoadingAction
  | DeleteAllDoneSuccessAction
  | DeleteAllDoneErrorAction
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
    .addOne(newTodo)
    .then((todo) => dispatch(addSuccess(todo)))
    .catch(() => dispatch(addError(initialTodos)))
}

export const addLoading: ActionCreator<AddLoadingAction> = (payload: Todo) => ({
  type: ActionType.AddLoading,
  payload,
})

export const addSuccess: ActionCreator<AddSuccessAction> = (payload: Todo) => ({
  type: ActionType.AddSuccess,
  payload,
})

export const addError: ActionCreator<AddErrorAction> = (payload: Todo[]) => ({
  type: ActionType.AddError,
  payload,
})

export const deleteOne: any = (payload: Partial<Todo>) => (dispatch, getState) => {
  const initialTodos = getTodoList(getState())
  const updatedTodos = initialTodos.filter((todo) => todo.id !== payload.id)

  dispatch(deleteOneLoading(updatedTodos))

  apiService
    .deleteOne(payload)
    .then((todos) => dispatch(deleteOneSuccess(todos)))
    .catch(() => dispatch(deleteOneError(initialTodos)))
}

export const deleteOneLoading: ActionCreator<DeleteOneLoading> = (payload: Todo[]) => ({
  type: ActionType.DeleteOneLoading,
  payload,
})

export const deleteOneSuccess: ActionCreator<DeleteOneSuccess> = (payload: Todo[]) => ({
  type: ActionType.DeleteOneSuccess,
  payload,
})

export const deleteOneError: ActionCreator<DeleteOneError> = (payload: Todo[]) => ({
  type: ActionType.DeleteOneError,
  payload,
})

export const deleteAllDone = () => (dispatch: Dispatch<ActionTypes>, getState: () => RootState) => {
  const initialTodos = getState().todo.todos
  dispatch(deleteAllDoneLoadingAction([]))

  apiService
    .deleteAll()
    .then((todos) => dispatch(deleteAllDoneSuccessAction(todos)))
    .catch(() => dispatch(deleteAllDoneErrorAction(initialTodos)))
}

export const deleteAllDoneLoadingAction: ActionCreator<DeleteAllDoneLoadingAction> = (
  payload: Todo[],
) => ({
  type: ActionType.DeleteAllLoading,
  payload,
})

export const deleteAllDoneSuccessAction: ActionCreator<DeleteAllDoneSuccessAction> = (
  payload: Todo[],
) => ({
  type: ActionType.DeleteAllSuccess,
  payload,
})

export const deleteAllDoneErrorAction: ActionCreator<DeleteAllDoneErrorAction> = (
  payload: Todo[],
) => ({
  type: ActionType.DeleteAllError,
  payload,
})

export const updateAction = (payload: Partial<Todo>) => async (
  dispatch: Dispatch<any>,
  getState: () => RootState,
) => {
  const initialTodos = getTodoList(getState())
  const updatedTodos = initialTodos.map((todo) => {
    if (todo.id === payload.id) {
      return { ...todo, ...payload }
    }
    return todo
  })
  dispatch(updateLoadingAction(updatedTodos))

  apiService
    .editOne(payload)
    .then((todos) => dispatch(updateSuccessAction(todos)))
    .catch(() => dispatch(updateErrorAction(initialTodos)))
}

export const updateSuccessAction: ActionCreator<UpdateSuccess> = (payload: Todo[]) => ({
  type: ActionType.UpdateSuccess,
  payload,
})

export const updateLoadingAction: ActionCreator<UpdateLoading> = (payload: Todo[]) => ({
  type: ActionType.UpdateLoading,
  payload,
})

export const updateErrorAction: ActionCreator<UpdateError> = (payload: Todo[]) => ({
  type: ActionType.UpdateError,
  payload,
})

export const toggleDoneStatusAllAction = (payload: { done: boolean }) => (
  dispatch,
  getState: () => RootState,
) => {
  const todos = getTodoList(getState())

  dispatch({
    type: ActionType.ToggleStatusAll,
    payload: todos.map((todo) => ({ ...todo, done: payload.done })),
  })
}
