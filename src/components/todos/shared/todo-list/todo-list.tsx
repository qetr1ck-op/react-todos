import React from 'react'

import { Todo } from '../../types'
import { TodoCount } from '../todo-count'
import { TodoItem } from '../todo-item'

interface Props {
  todos: Todo[]
  statusChange(changes: { id: string }): void
  deleteItem(changes: { id: string }): void
  valueChange(changes: { id: string; value: string }): void
}

export class TodoList extends React.PureComponent<Props> {
  render() {
    const { todos } = this.props
    return (
      <div>
        {todos.length ? (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <TodoItem
                  todo={todo}
                  statusChange={this.statusChange}
                  valueChange={this.valueChange}
                  deleteItem={this.deleteItem}
                />
              </li>
            ))}
          </ul>
        ) : (
          'Empty list'
        )}
        <TodoCount todos={todos} />
      </div>
    )
  }
  private statusChange = (changes: { id: string }) => {
    this.props.statusChange(changes)
  }

  private valueChange = (changes: { id: string; value: string }) => {
    this.props.valueChange(changes)
  }

  private deleteItem = (changes: { id: string }) => {
    this.props.deleteItem({ id: changes.id })
  }
}
