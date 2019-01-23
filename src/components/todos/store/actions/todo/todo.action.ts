import { Action, ActionCreator, Dispatch } from 'redux'
import { RootState } from '../../../../../store/root'

import { TodoFilter } from '../../../enums'
import { TodosApiService } from '../../../services/api'
import { uuidByDate } from '../../../services/uuid'
import { Todo } from '../../../types'
import { getTodoList } from '../../selectors/todo'

export enum TodoActionType {
  Add = '[TODO] ADD',
  AddLoading = '[TODO] ADD_PENDING',
  AddSuccess = '[TODO] ADD_FULFILLED',
  DeleteOne = '[TODO] DELETE_SINGLE',
  DeleteAll = '[TODO] DELETE_ALL',
  Update = '[TODO] UPDATE',
  UpdateSuccess = '[TODO] UPDATE_FULFILLED',
  UpdateLoading = '[TODO] UPDATE_PENDING',
  UpdateError = '[TODO] UPDATE_REJECTED',
  ToggleStatusAll = '[TODO] TOGGLE_STATUS_ALL',
  FilterChange = '[TODO] FILTER_CHANGE',
  Get = '[TODO] GET',
  GetLoading = '[TODO] GET_PENDING',
  GetSuccess = '[TODO] GET_FULFILLED',
}

const apiService = new TodosApiService()

export class Add implements Action {
  readonly type = TodoActionType.Add
  payload: any
  constructor(data: { value: string }) {
    this.payload = apiService.addSingle({ value: data.value, id: uuidByDate(), done: false })
  }
}

export class AddLoading implements Action {
  readonly type = TodoActionType.AddLoading
}

export class AddSuccess implements Action {
  readonly type = TodoActionType.AddSuccess
  payload: Todo
}

export class DeleteOne implements Action {
  readonly type = TodoActionType.DeleteOne
  constructor(public payload: { id: string }) {}
}

export class DeleteAllDone implements Action {
  readonly type = TodoActionType.DeleteAll
}

interface Update {
  type: TodoActionType.Update
  payload: Promise<Todo[]>
}
export const update = (payload: Partial<Todo>) => async (
  dispatch: Dispatch<TodoActions>,
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

interface UpdateSuccess {
  type: TodoActionType.UpdateSuccess
  payload: Todo[]
}

export const updateSuccess: ActionCreator<UpdateSuccess> = (payload: Todo[]) => ({
  type: TodoActionType.UpdateSuccess,
  payload,
})

interface UpdateLoading {
  type: TodoActionType.UpdateLoading
  payload: Todo[]
}

export const updateLoading: ActionCreator<UpdateLoading> = (payload: Todo[]) => ({
  type: TodoActionType.UpdateLoading,
  payload,
})

interface UpdateError {
  type: TodoActionType.UpdateError
  payload: Todo[]
}
export const updateError: ActionCreator<UpdateError> = (payload: Todo[]) => ({
  type: TodoActionType.UpdateError,
  payload,
})

export class ToggleDoneStatusAll implements Action {
  readonly type = TodoActionType.ToggleStatusAll
  constructor(public payload: { done: boolean }) {}
}

export class ChangeFilter implements Action {
  readonly type = TodoActionType.FilterChange
  constructor(public payload: { filter: TodoFilter }) {}
}

export class Get implements Action {
  readonly type = TodoActionType.Get
  payload = apiService.getAll()
}

export class GetLoading implements Action {
  readonly type = TodoActionType.GetLoading
}

export class GetSuccess implements Action {
  readonly type = TodoActionType.GetSuccess
  payload: Todo[]
}

export type TodoActions =
  | Add
  | AddLoading
  | AddSuccess
  | DeleteOne
  | DeleteAllDone
  | ToggleDoneStatusAll
  | ChangeFilter
  | Get
  | GetLoading
  | GetSuccess
  | Update
  | UpdateSuccess
  | UpdateError
  | UpdateLoading
