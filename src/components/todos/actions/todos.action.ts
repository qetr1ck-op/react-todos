import { Action } from 'redux'
import { TodoFilter } from '../enums'

import { Todo } from '../types'

export enum TodoActionType {
  Add = 'Add',
  DeleteOne = 'DeleteSinge',
  DeleteAll = 'DeleteAll',
  Edit = 'Edit',
  ToggleStatusAll = 'ToggleStatusAll',
  FilterChange = 'FilterChange',
}

export class Add implements Action {
  readonly type = TodoActionType.Add
  constructor(public payload: { value: string }) {}
}

export class DeleteOne implements Action {
  readonly type = TodoActionType.DeleteOne
  constructor(public payload: string) {}
}

export class DeleteAll implements Action {
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
  constructor(public payload: { value: TodoFilter }) {}
}

export type TodoActions = Add | DeleteOne | DeleteAll | Edit | ToggleDoneStatusAll | ChangeFilter
