import React from 'react'

import { TodoFilters as TodoFiltersEnum } from '../../enums'
import { Todo } from '../../types'
import { TodoCount } from '../todo-count'
import { TodoDeleteDone } from '../todo-delete-done'
import { TodoFilters } from '../todo-filters'
import { TodoItem } from '../todo-item'

interface Props {
  todos: Todo[]
  totalTodos: number
  filters: TodoFiltersEnum[]
  hasDoneItems: boolean
  statusChange(changes: { id: string }): void
  deleteItem(changes: { id: string }): void
  valueChange(changes: { id: string; value: string }): void
  deleteDoneItems(): void
}

export function TodoList({
  todos,
  totalTodos,
  filters,
  deleteItem,
  statusChange,
  valueChange,
  deleteDoneItems,
  hasDoneItems,
}: Props) {
  return (
    <div>
      {!!totalTodos && (
        <>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <TodoItem
                  todo={todo}
                  statusChange={statusChange}
                  valueChange={valueChange}
                  deleteItem={deleteItem}
                />
              </li>
            ))}
          </ul>
          <TodoCount todos={todos} />
          <TodoFilters filters={filters} />
          {hasDoneItems && <TodoDeleteDone deleteDoneItems={deleteDoneItems} />}
        </>
      )}
    </div>
  )
}
