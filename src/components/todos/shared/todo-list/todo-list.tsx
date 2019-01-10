import React from 'react'

import { FooterBox, List } from './todo-list.elements'

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
          <List>
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
          </List>
          <FooterBox>
            <TodoCount todos={todos} />
            <TodoFilters filters={filters} />
            <div style={{ visibility: hasDoneItems ? 'visible' : 'hidden' }}>
              <TodoDeleteDone deleteDoneItems={deleteDoneItems} />
            </div>
          </FooterBox>
        </>
      )}
    </div>
  )
}
