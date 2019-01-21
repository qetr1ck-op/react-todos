import { Action } from 'redux'

import { TodoFilter } from '../../../enums'
import { TodosApiService } from '../../../services/api'
import { uuidByDate } from '../../../services/uuid'
import { Todo } from '../../../types'

export enum TodoActionType {
  Add = '[TODO] ADD',
  AddLoading = '[TODO] ADD_PENDING',
  AddSuccess = '[TODO] ADD_FULFILLED',
  DeleteOne = '[TODO] DELETE_SINGLE',
  DeleteAll = '[TODO] DELETE_ALL',
  Update = '[TODO] UPDATE',
  UpdateSuccess = '[TODO] UPDATE_FULFILLED',
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

/*
[] edit -> update
[] optimistic update?
[] thunk: update -> 
1. dispatch(UpdateSuccess)
2. dispatch(UpdateError)
*/
export class Edit implements Action {
  readonly type = TodoActionType.Update
  payload: Promise<Todo[]>
  constructor(payload: Partial<Todo>) {
    this.payload = apiService.editSingle(payload)
  }
}

export const EditThunk = (payload: Partial<Todo>) => (dispatch, getState) => {
  dispatch
}

export class EditSuccess implements Action {
  readonly type = TodoActionType.UpdateSuccess
  constructor(public payload: Todo[]) {}
}

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
  | Edit
  | EditSuccess
