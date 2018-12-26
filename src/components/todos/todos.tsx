import React from 'react'

import { uuid } from './services'
import { TodoInput } from './shared'
import { TodoList } from './shared/todo-list'
import { TodoRoute } from './todos-routes'
import { Todo } from './types'

interface State {
  todos: Todo[]
  filters: string[]
}

interface Props {
  filter: TodoRoute
}

export class Todos extends React.Component<Props, State> {
  state = {
    todos: [],
    filters: [TodoRoute.All, TodoRoute.Active, TodoRoute.Done],
  }

  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>

        <TodoInput value={''} onAdd={this.onAdd} />

        <TodoList
          todos={this.applyFilter()}
          filters={this.state.filters}
          statusChange={this.statusChange}
          valueChange={this.valueChange}
          delete={this.delete}
        />
      </div>
    )
  }
  private get uuid() {
    return uuid()
  }
  private onAdd = ({ value }: Todo) => {
    this.setState((state: State) => ({
      ...state,
      todos: [...this.state.todos, { value, id: this.uuid, done: false }],
    }))
  }
  private statusChange = ({ id }: { id: string; value: string }) => {
    this.setState((state: State) => ({
      ...state,
      todos: this.state.todos.map((todo: Todo) => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done }
        }
        return todo
      }),
    }))
  }

  private valueChange = ({ id, value }: { id: string; value: string }) => {
    this.setState((state: State) => ({
      ...state,
      todos: this.state.todos.map((todo: Todo) => {
        if (todo.id === id) {
          return { ...todo, value }
        }
        return todo
      }),
    }))
  }

  private delete = ({ id }: { id: string }) => {
    this.setState((state: State) => ({
      ...state,
      todos: this.state.todos.filter((todo: Todo) => todo.id !== id),
    }))
  }

  private applyFilter(): Todo[] {
    const { todos } = this.state
    const { filter } = this.props

    if (filter === TodoRoute.Active) {
      return todos.filter((todo: Todo) => !todo.done)
    }
    if (filter === TodoRoute.Done) {
      return todos.filter((todo: Todo) => todo.done)
    }
    return todos
  }
}
