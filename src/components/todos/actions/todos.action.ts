import { Action } from 'redux'

import { Todo } from '../types'

export enum ActionType {
  Add = 'Add',
  DeleteOne = 'DeleteSinge',
  DeleteAll = 'DeleteAll',
  Edit = 'Edit',
  ToggleStatusAll = 'ToggleStatusAll',
}

export class Add implements Action {
  readonly type = ActionType.Add
  constructor(public payload: { value: string }) {}
}

export class DeleteOne implements Action {
  readonly type = ActionType.DeleteOne
  constructor(public payload: string) {}
}

export class DeleteAll implements Action {
  readonly type = ActionType.DeleteAll
}

export class Edit implements Action {
  readonly type = ActionType.Edit
  constructor(public payload: Partial<Todo>) {}
}

export class ToggleDoneStatusAll implements Action {
  readonly type = ActionType.ToggleStatusAll
  constructor(public payload: { done: boolean }) {}
}

export type Actions = Add | DeleteOne | DeleteAll | Edit | ToggleDoneStatusAll
