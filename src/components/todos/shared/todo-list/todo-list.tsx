import React from 'react'

import style from './todo-list.css'

import { Todo } from '../../types'
import { TodoCount } from '../todo-count'
import { TodoDeleteDone } from '../todo-delete-done'
import { TodoFilters } from '../todo-filters'
import { TodoItem } from '../todo-item'

interface Props {
  todos: Todo[]
  totalTodos: number
  hasDoneItems: boolean
  statusChange(changes: { id: string }): void
  deleteItem(changes: { id: string }): void
  valueChange(changes: { id: string; value: string }): void
  deleteDoneItems(): void
}

export function TodoList({
  todos,
  totalTodos,
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
          <ul className={style.list}>
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
          <div className={style.footer}>
            <TodoCount todos={todos} />
            <TodoFilters />
            <div style={{ visibility: hasDoneItems ? 'visible' : 'hidden' }}>
              <TodoDeleteDone deleteDoneItems={deleteDoneItems} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
