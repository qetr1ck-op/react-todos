import { createSelector } from 'reselect'
import { RootState } from '../../../../../store/root'
import { TodoFilter } from '../../../enums'
import { Todo } from '../../../types'

export const getFilteredTodos = createSelector(
  (state: RootState, filter: TodoFilter) => ({ todos: state.todo.todos, filter }),
  ({ todos, filter }): Todo[] => {
    if (filter === TodoFilter.Active) {
      return todos.filter((todo) => !todo.done)
    }
    if (filter === TodoFilter.Done) {
      return todos.filter((todo) => todo.done)
    }
    return todos
  },
)

export const hasDoneTodos = createSelector(
  (todos: Todo[]) => todos,
  (todos) => todos.some((todo) => todo.done),
)
