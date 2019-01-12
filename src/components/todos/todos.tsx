import React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { Route, RouteComponentProps, Switch } from 'react-router'
// import { Dispatch } from 'redux'
// import { Actions, TodosActions } from './actions'

import { TodoFilters } from './enums'
import { TodosState } from './reducers/todos'
// import { uuid } from './services'
import { TodoCheckAll, TodoInput } from './shared'
import { TodoList } from './shared/todo-list'

import style from './todos.css'
import { Todo } from './types'

interface State {
  filters: TodoFilters[]
  isAllChecked: boolean
}

interface Props {
  todos: Todo[]

}

interface DispatchProps {
}

export class Todos extends React.Component<Props, State> {
  state = {
    filters: [TodoFilters.All, TodoFilters.Active, TodoFilters.Done],
    isAllChecked: false,
  }

  /*componentDidUpdate(): void {
    this.saveItems()
  }*/

  render() {
    const { isAllChecked } = this.state
    const { todos, toggleDoneStatusAll } = this.props

    return (
      <section className={style.main}>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <h1 className={style.title}>todos</h1>
        <div className={style.header}>
          {!!todos.length && (
            <TodoCheckAll
              isAllChecked={isAllChecked}
              checkAll={toggleDoneStatusAll(isAllChecked)}
            />
          )}
          <TodoInput value="" changeValue={() => {}} />
        </div>

        <Switch>
          <Route exact path="/" render={this.renderComponent(TodoFilters.All)} />
          <Route path="/active" render={this.renderComponent(TodoFilters.Active)} />
          <Route path="/done" render={this.renderComponent(TodoFilters.Done)} />
        </Switch>
      </section>
    )
  }
  private renderComponent = (filter: TodoFilters) => {
    return (props: RouteComponentProps) => (
      <TodoList
        {...props}
        todos={this.applyFilter(filter)}
        totalTodos={this.props.todos.length}
        filters={this.state.filters}
        statusChange={() => {}}
        valueChange={() => {}}
        deleteItem={() => {}}
        deleteDoneItems={() => {}}
        hasDoneItems={this.hasDoneItems()}
      />
    )
  }
  /*private get uuid(): string {
    return uuid()
  }*/
  // TODO: move to selector
  private hasDoneItems = (): boolean => {
    return this.props.todos.some((todo) => todo.done)
  }

  // TODO: to store.dispatch
  /*private addNewItem = ({ value }: Todo) => {
    this.setState((state: State) => ({
      ...state,
      todos: [...this.state.todos, { value, id: this.uuid, done: false }],
    }))
  }*/

  // TODO: to store.dispatch
  /*private statusChange = ({ id }: { id: string; value: string }) => {
    this.setState((state: State) => ({
      ...state,
      todos: this.state.todos.map((todo: Todo) => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done }
        }
        return todo
      }),
    }))
  }*/

  // TODO: to store.dispatch
  /*private valueChange = ({ id, value }: { id: string; value: string }) => {
    this.setState((state: State) => ({
      ...state,
      todos: this.state.todos.map((todo: Todo) => {
        if (todo.id === id) {
          return { ...todo, value }
        }
        return todo
      }),
    }))
  }*/

  /*private deleteItem = ({ id }: { id: string }) => {
    this.setState((state: State) => ({
      ...state,
      todos: this.state.todos.filter((todo: Todo) => todo.id !== id),
    }))
  }*/

  // TODO: integrate with store and route
  private applyFilter(filter: TodoFilters): Todo[] {
    const { todos } = this.props

    if (filter === TodoFilters.Active) {
      return todos.filter((todo: Todo) => !todo.done)
    }
    if (filter === TodoFilters.Done) {
      return todos.filter((todo: Todo) => todo.done)
    }
    return todos
  }

  // TODO: to store.dispatch
  /*private checkAllItems = () => {
    this.setState((state: State) => ({
      ...state,
      isAllChecked: !state.isAllChecked,
      todos: state.todos.map((todo: Todo) => ({ ...todo, done: !state.isAllChecked })),
    }))
  }*/

  // TODO: to store.dispatch
  /*private deleteDoneItems = () => {
    this.setState((state: State) => ({
      ...state,
      isAllChecked: false,
      todos: state.todos.filter((todo: Todo) => !todo.done),
    }))
  }*/

  /*private saveItems = (): void => {
    localStorage.setItem(Storage.Todos, JSON.stringify(this.state.todos))
  }

  private getItems(): Todo[] {
    return JSON.parse(localStorage.getItem(Storage.Todos) as any) || []
  }*/
}

function mapStateToProps(state: TodosState) {
  return { todos: state.todos }
}

/*function mapDispatchToProps(dispatch: Dispatch<TodosActions>) {
  return {
    toggleDoneStatusAll(done: boolean) {
      dispatch({ type: Actions.ToggleDoneStatusAll, payload: done })
    },
  }
}*/

export const TodosConnected = connect<TodosState, DispatchProps>(
  mapStateToProps,
  // mapDispatchToProps,
)(Todos)
