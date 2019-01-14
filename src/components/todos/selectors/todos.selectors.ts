import { createSelector } from 'reselect'
import { TodoFilter } from '../enums'
import { Todo } from '../types'

export const filterTodosSelect = createSelector(
  [(todos: Todo[], filter: TodoFilter) => ({ todos, filter })],
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
