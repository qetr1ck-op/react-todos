import React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router'

import { Storage, TodoFilters } from './enums'
import { uuid } from './services'
import { TodoInput } from './shared'
import { TodoList } from './shared/todo-list'
import { Todo } from './types'

interface State {
  todos: Todo[]
  todo: string
  filters: TodoFilters[]
  allChecked: boolean
}

export class Todos extends React.Component<{}, State> {
  state = {
    todos: this.getItems(),
    todo: '',
    filters: [TodoFilters.All, TodoFilters.Active, TodoFilters.Done],
    allChecked: false,
  }

  componentDidUpdate(): void {
    this.saveItems()
  }

  render() {
    const { todos, todo, allChecked } = this.state

    return (
      <div>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>

        <div>
          {!!todos.length && (
            <input type="checkbox" checked={allChecked} onChange={this.checkAllItems} />
          )}
          <TodoInput value={todo} changeValue={this.addNewItem} />
        </div>

        <Switch>
          <Route exact path="/" render={this.renderComponent(TodoFilters.All)} />
          <Route path="/active" render={this.renderComponent(TodoFilters.Active)} />
          <Route path="/done" render={this.renderComponent(TodoFilters.Done)} />
        </Switch>
      </div>
    )
  }
  private renderComponent = (filter: TodoFilters) => {
    return (props: RouteComponentProps) => (
      <TodoList
        {...props}
        todos={this.applyFilter(filter)}
        totalTodos={this.state.todos.length}
        filters={this.state.filters}
        statusChange={this.statusChange}
        valueChange={this.valueChange}
        deleteItem={this.deleteItem}
        deleteDoneItems={this.deleteDoneItems}
        hasDoneItems={this.hasDoneItems()}
      />
    )
  }
  private get uuid(): string {
    return uuid()
  }
  private hasDoneItems = (): boolean => {
    return this.state.todos.some((todo) => todo.done)
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

  private applyFilter(filter: TodoFilters): Todo[] {
    const { todos } = this.state

    if (filter === TodoFilters.Active) {
      return todos.filter((todo: Todo) => !todo.done)
    }
    if (filter === TodoFilters.Done) {
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

  private deleteDoneItems = () => {
    this.setState((state: State) => ({
      ...state,
      allChecked: false,
      todos: state.todos.filter((todo: Todo) => !todo.done),
    }))
  }

  private saveItems = (): void => {
    localStorage.setItem(Storage.Todos, JSON.stringify(this.state.todos))
  }

  private getItems(): Todo[] {
    return JSON.parse(localStorage.getItem(Storage.Todos) as any) || []
  }
}
