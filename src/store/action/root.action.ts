import { ActionType } from 'typesafe-actions'
import * as todosActions from '../../components/todos/store/actions'

export const rootAction = {
  // TODO:
  // router: routerActions,
  todos: todosActions,
}

export type RootAction = ActionType<typeof rootAction>
