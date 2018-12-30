import React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router'

import { Storage, TodoFilters as TodoFiltersEnum } from './enums'
import { uuid } from './services'
import { TodoFilters, TodoInput } from './shared'
import { TodoList } from './shared/todo-list'
import { Todo } from './types'

interface State {
  todos: Todo[]
  todo: string
  filters: string[]
  allChecked: boolean
}

export class Todos extends React.Component<{}, State> {
  state = {
    todos: this.getItems(),
    todo: '',
    filters: [TodoFiltersEnum.All, TodoFiltersEnum.Active, TodoFiltersEnum.Done],
    allChecked: false
  }

  componentDidUpdate(): void {
    this.saveItems()
  }

  render() {
    const { todo, filters, allChecked } = this.state

    return (
      <div>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>

        <div>
          <input type="checkbox" checked={allChecked} onChange={this.checkAllItems} />
          <TodoInput value={todo} changeValue={this.addNewItem} />
        </div>

        <Switch>
          <Route exact path="/" render={this.renderComponent(TodoFiltersEnum.All)} />
          <Route path="/active" render={this.renderComponent(TodoFiltersEnum.Active)} />
          <Route path="/done" render={this.renderComponent(TodoFiltersEnum.Done)} />
        </Switch>

        <TodoFilters filters={filters} />
      </div>
    )
  }
  private renderComponent = (filter: TodoFiltersEnum) => {
    return (props: RouteComponentProps) => (
      <TodoList
        {...props}
        todos={this.applyFilter(filter)}
        statusChange={this.statusChange}
        valueChange={this.valueChange}
        deleteItem={this.deleteItem}
      />
    )
  }
  private get uuid(): string {
    return uuid()
  }
  private addNewItem = ({ value }: Todo) => {
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

  private deleteItem = ({ id }: { id: string }) => {
    this.setState((state: State) => ({
      ...state,
      todos: this.state.todos.filter((todo: Todo) => todo.id !== id),
    }))
  }

  private applyFilter(filter: TodoFiltersEnum): Todo[] {
    const { todos } = this.state

    if (filter === TodoFiltersEnum.Active) {
      return todos.filter((todo: Todo) => !todo.done)
    }
    if (filter === TodoFiltersEnum.Done) {
      return todos.filter((todo: Todo) => todo.done)
    }
    return todos
  }

  private checkAllItems = () => {
    this.setState((state: State) => ({
      ...state,
      allChecked: !state.allChecked,
      todos: state.todos.map((todo: Todo) => ({ ...todo, done: !state.allChecked })),
    }))
  }

  private saveItems = (): void => {
    localStorage.setItem(Storage.Todos, JSON.stringify(this.state.todos))
  }

  private getItems(): Todo[] {
    return JSON.parse(localStorage.getItem(Storage.Todos) as any) || []
  }
}
