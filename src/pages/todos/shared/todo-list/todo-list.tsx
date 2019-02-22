import React from 'react'

import style from './todo-list.css'

import { Todo } from '../../models/types'
import { TodoCount } from '../todo-count'
import { TodoDeleteDone } from '../todo-delete-done'
import { TodoFilters } from '../todo-filters'
import { TodoItem } from '../todo-item'

interface Props {
  todos: Todo[]
  totalTodos: number
  hasDoneItems: boolean
}

export function TodoList({ todos, totalTodos, hasDoneItems }: Props) {
  return (
    <div>
      {!!totalTodos && (
        <>
          <ul className={style.list}>
            {todos.map((todo) => (
              <li key={todo.id}>
                <TodoItem todo={todo} />
              </li>
            ))}
          </ul>
          <div className={style.footer}>
            <TodoCount todos={todos} />
            <TodoFilters />
            <div style={{ visibility: hasDoneItems ? 'visible' : 'hidden' }}>
              <TodoDeleteDone />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
