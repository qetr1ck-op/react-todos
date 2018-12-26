import React from 'react'
import { TodoRoute } from '../../todos-routes'
import { Todo } from '../../types'
import { TodoCount } from '../todo-count'
import { TodoFilters } from '../todo-filters'
import { TodoItem } from '../todo-item'

interface IState {}
interface IProps {
  todos: Todo[]
  filters: TodoRoute[]
  statusChange(changes: { id: string }): void
  delete(changes: { id: string }): void
  valueChange(changes: { id: string; value: string }): void
}

export class TodoList extends React.Component<IProps, IState> {
  render() {
    const { todos, filters } = this.props
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
                  delete={this.deleteItem}
                />
              </li>
            ))}
          </ul>
        ) : (
          'Empty list'
        )}
        <TodoCount todos={todos} />
        <TodoFilters filters={filters}/>
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
    this.props.delete({ id: changes.id })
  }
}
