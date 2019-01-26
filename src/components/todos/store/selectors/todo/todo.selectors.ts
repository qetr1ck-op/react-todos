import { toList } from '@root/services'
import { createSelector } from 'reselect'

import { RootState } from '@root/store'

import { Todo, TodoFilter } from '../../../models'
import { TodoState } from '../../reducers'

const getTodoState = (state: RootState) => state.todo

export const getTodoList = createSelector(
  getTodoState,
  (state: TodoState) => toList(state.todos),
)

export const getFilteredTodos = createSelector(
  (state: RootState, filter: TodoFilter) => filter,
  getTodoList,
  (filter, todos): Todo[] => {
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

export const isLoading = createSelector(
  getTodoState,
  (state: TodoState) => state.isLoading,
)

export const isAddLoading = createSelector(
  getTodoState,
  (state: TodoState) => state.isAddLoading || false,
)
