import { Todo } from '../types'

interface Action {
  
}

export enum Actions {
  Add = 'Add',
  DeleteSingle = 'DeleteSinge',
  DeleteDone = 'DeleteAll',
  Edit = 'Remove',
  ToggleStatusAll = 'ToggleStatusAll'
}

export class Add {
  readonly type = Actions.Add
  constructor(public payload: Todo) {}
}

export class DeleteSingle {
  readonly type = Actions.DeleteSingle
  constructor(public payload: string) {}
}

export class DeleteAll {
  readonly type = Actions.DeleteDone
}

export class Edit {
  readonly type = Actions.Edit
  constructor(public payload: Partial<Todo>) {}
}

export class ToggleStatusAll {
  readonly type = Actions.ToggleStatusAll
}

export type TodosAction = Add | DeleteSingle |DeleteAll | Edit | ToggleStatusAll
