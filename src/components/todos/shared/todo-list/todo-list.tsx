import React from 'react'

import style from './todo-list.css'

import { Todo } from '../../types'
import { TodoCount } from '../todo-count'
import { TodoDeleteDoneConnected } from '../todo-delete-done'
import { TodoFilters } from '../todo-filters'
import { TodoItemConnected } from '../todo-item'

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
                <TodoItemConnected todo={todo} />
              </li>
            ))}
          </ul>
          <div className={style.footer}>
            <TodoCount todos={todos} />
            <TodoFilters />
            <div style={{ visibility: hasDoneItems ? 'visible' : 'hidden' }}>
              <TodoDeleteDoneConnected />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
