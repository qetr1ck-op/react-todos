import React from 'react'

import { TodoRoute } from '../root'
import { uuid } from './services'
import { TodoInput } from './shared'
import { TodoList } from './shared/todo-list'

interface IState {
  todos: ITodo[]
  filters: string[]
}

interface IProps {
  filter: TodoRoute
}

export interface ITodo {
  value: string
  done: boolean
  id: string
}

export class Todos extends React.Component<IProps, IState> {
  private get uuid() {
    return uuid()
  }

  state = {
    todos: [],
    filters: [TodoRoute.All, TodoRoute.Active, TodoRoute.Done],
  }

  // static getDerivedStateFromProps(props: IProps, state: IState) {
  //   console.log(props)
  //   console.log(state)
  //   return null
  // }
  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>): void {
    if (this.props.filter === prevProps.filter) {
      return
    }
    this.setState({ todos: this.applyFilter() })
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

  private applyFilter(): ITodo[] {
    const { todos } = this.state
    const { filter } = this.props

    if (filter === TodoRoute.Active) {
      return todos.filter((todo: ITodo) => todo.done)
    }
    if (filter === TodoRoute.Done) {
      return todos.filter((todo: ITodo) => !todo.done)
    }
    return todos
  }
}
