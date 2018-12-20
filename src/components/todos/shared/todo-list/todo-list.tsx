import React from 'react'
import { ITodo, TodoFilter } from '../../todos'
import { TodoCount } from '../todo-count'
import { TodoFilters } from '../todo-filters'
import { TodoItem } from '../todo-item'

interface IState {}
interface IProps {
  todos: ITodo[]
  filters: TodoFilter[]
  filter: TodoFilter
  statusChange(changes: { id: string }): void
  valueChange(changes: { id: string; value: string }): void
}

export class TodoList extends React.Component<IProps, IState> {
  render() {
    const { todos, filter, filters } = this.props
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
                />
              </li>
            ))}
          </ul>
        ) : (
          'Empty list'
        )}
        <TodoCount todos={todos} />
        <TodoFilters filters={filters} activeFilter={filter} />
      </div>
    )
  }
  private statusChange = (changes: { id: string }) => {
    this.props.statusChange(changes)
  }

  private valueChange = (changes: { id: string; value: string }) => {
    this.props.valueChange(changes)
  }
}
