import React from 'react'

import { uuid } from './services'
import { TodoInput } from './shared'
import { TodoList } from './shared/todo-list'

interface IState {
  todos: ITodo[]
  filter: TodoFilter
  filters: TodoFilter[]
}

export interface ITodo {
  value: string
  done: boolean
  id: string
}

export enum TodoFilter {
  ACTIVE = 'ACTIVE',
  DONE = 'DONE',
  ALL = 'ALL',
}

export class Todos extends React.Component<{}, IState> {
  state = {
    todos: [],
    filter: TodoFilter.ALL,
    filters: [TodoFilter.ACTIVE, TodoFilter.DONE, TodoFilter.ALL],
  }

  render() {
    const { todos } = this.state
    return (
      <div>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>

        <TodoInput value={''} onAdd={this.onAdd} />

        <TodoList
          todos={todos}
          filters={this.state.filters}
          filter={this.state.filter}
          statusChange={this.statusChange}
          valueChange={this.valueChange}
          delete={this.delete}
        />
      </div>
    )
  }
  private onAdd = ({ value }: ITodo) => {
    this.setState((state: IState) => ({
      ...state,
      todos: [...this.state.todos, { value, id: this.uuid, done: false }],
    }))
  }
  private get uuid() {
    return uuid()
  }
  private statusChange = ({ id }: { id: string; value: string }) => {
    this.setState((state: IState) => ({
      ...state,
      todos: this.state.todos.map((todo: ITodo) => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done }
        }
        return todo
      }),
    }))
  }

  private valueChange = ({ id, value }: { id: string; value: string }) => {
    this.setState((state: IState) => ({
      ...state,
      todos: this.state.todos.map((todo: ITodo) => {
        if (todo.id === id) {
          return { ...todo, value }
        }
        return todo
      }),
    }))
  }

  private delete = ({ id }: { id: string }) => {
    this.setState((state: IState) => ({
      ...state,
      todos: this.state.todos.filter((todo: ITodo) => todo.id !== id),
    }))
  }
}
