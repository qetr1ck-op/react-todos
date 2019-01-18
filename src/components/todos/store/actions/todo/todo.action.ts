import { Action } from 'redux'

import { createAsyncAction } from 'redux-promise-middleware-actions';

import { TodoFilter } from '../../../enums'
import { TodosApiService } from '../../../services/api'
import { Todo } from '../../../types'

export enum TodoActionType {
  Add = 'Add',
  DeleteOne = 'DeleteSinge',
  DeleteAll = 'DeleteAll',
  Edit = 'Edit',
  ToggleStatusAll = 'ToggleStatusAll',
  FilterChange = 'FilterChange',
  Load = 'Load'
}

export class Add implements Action {
  readonly type = TodoActionType.Add
  constructor(public payload: { value: string }) {}
}

export class DeleteOne implements Action {
  readonly type = TodoActionType.DeleteOne
  constructor(public payload: { id: string }) {}
}

export class DeleteAllDone implements Action {
  readonly type = TodoActionType.DeleteAll
}

export class Edit implements Action {
  readonly type = TodoActionType.Edit
  constructor(public payload: Partial<Todo>) {}
}

export class ToggleDoneStatusAll implements Action {
  readonly type = TodoActionType.ToggleStatusAll
  constructor(public payload: { done: boolean }) {}
}

export class ChangeFilter implements Action {
  readonly type = TodoActionType.FilterChange
  constructor(public payload: { filter: TodoFilter }) {}
}

export const loadAction = createAsyncAction(TodoActionType.Load, () => {
  const api = new TodosApiService()
  return api.getAll()
})

export class Test implements Action {
  readonly type = TodoActionType.Load
  payload: any
  constructor() {
    // const api = new TodosApiService()
    this.payload = Promise.reject(1)
  }
}

export type TodoActions =
  | Add
  | DeleteOne
  | DeleteAllDone
  | Edit
  | ToggleDoneStatusAll
  | ChangeFilter
  | Test
