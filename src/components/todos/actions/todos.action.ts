import { Todo } from '../types'

interface Action {
  type: Actions
}

export enum Actions {
  Add = 'Add',
  DeleteSingle = 'DeleteSinge',
  DeleteDone = 'DeleteAll',
  Edit = 'Remove',
  ToggleDoneStatusAll = 'ToggleDoneStatusAll',
}

export class Add implements Action {
  readonly type = Actions.Add
  constructor(public payload: Todo) {}
}

export class DeleteOne implements Action {
  readonly type = Actions.DeleteSingle
  constructor(public payload: string) {}
}

export class DeleteAll implements Action {
  readonly type = Actions.DeleteDone
}

export class Edit implements Action {
  readonly type = Actions.Edit
  constructor(public payload: Partial<Todo>) {}
}

export class ToggleDoneStatusAll implements Action {
  readonly type = Actions.ToggleDoneStatusAll
  constructor(public payload: boolean) {}
}

export type TodosActions = Add | DeleteOne | DeleteAll | Edit | ToggleDoneStatusAll
