import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Dispatch } from 'redux'
import * as TodoActions from './actions'

import { TodoFilter } from './enums'
import { TodosState } from './reducers'
import { filterTodosSelect } from './selectors'
import { TodoCheckAll, TodoInput } from './shared'
import { TodoList } from './shared/todo-list'
import style from './todos.css'
import { Todo } from './types'

// import { TodoList } from './shared/todo-list'

interface State {
  isAllChecked: boolean
}

interface StateProps extends RouteComponentProps<{ filter?: string }> {
  todos: Todo[]
  filter: TodoFilter
}

interface DispatchProps {
  // toggleDoneStatusAll(done: boolean): void
  // addTodo(value: string): void
  // changeFilter(filter: TodoFilter): void
  dispatch: Dispatch<TodoActions.TodoActions>
}

type Props = StateProps & DispatchProps

export class Todos extends React.Component<Props, State> {
  state = {
    isAllChecked: false,
  }

  render() {
    const { isAllChecked } = this.state
    const { todos } = this.props

    return (
      <section className={style.main}>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <h1 className={style.title}>todos</h1>
        <div className={style.header}>
          {!!todos.length && (
            <TodoCheckAll isAllChecked={isAllChecked} checkAll={this.checkAllItems} />
          )}
          <TodoInput value="" changeValue={this.addNewItem} />
        </div>

        <TodoList
          todos={this.props.todos}
          totalTodos={this.props.todos.length}
          statusChange={() => {}}
          valueChange={() => {}}
          deleteItem={() => {}}
          deleteDoneItems={() => {}}
          hasDoneItems={this.hasDoneItems()}
        />
      </section>
    )
  }
  /*private renderComponent = (filter: TodoFilter) => {
    // this.props.changeFilter(filter)
    return (props: RouteComponentProps) => (
      <TodoList
        {...props}
        todos={filterTodosSelect(this.props.todos, filter)}
        totalTodos={this.props.todos.length}
        filters={this.filters}
        statusChange={() => {}}
        valueChange={() => {}}
        deleteItem={() => {}}
        deleteDoneItems={() => {}}
        hasDoneItems={this.hasDoneItems()}
      />
    )
  }*/
  /*private get uuid(): string {
    return uuid()
  }*/
  // TODO: move to selector
  private hasDoneItems = (): boolean => this.props.todos.some((todo) => todo.done)

  private addNewItem = ({ value }: Todo) => {
    this.props.dispatch(new TodoActions.Add({ value }))
  }

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
  /*private applyFilter(filter: TodoFilter): Todo[] {
    const { todos } = this.props

    if (filter === TodoFilter.Active) {
      return todos.filter((todo: Todo) => !todo.done)
    }
    if (filter === TodoFilter.Done) {
      return todos.filter((todo: Todo) => todo.done)
    }
    return todos
  }*/

  private checkAllItems = () => {
    this.setState((state: State) => {
      return {
        isAllChecked: !state.isAllChecked,
      }
    })
    this.props.dispatch(new TodoActions.ToggleDoneStatusAll({ done: !this.state.isAllChecked}))
  }

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

function mapStateToProps(state: TodosState, props: Props): any {
  return { todos: filterTodosSelect(state.todos, props.match.params.filter as TodoFilter || TodoFilter.All) }
}

function mapDispatchToProps(dispatch: Dispatch<TodoActions.TodoActions>): DispatchProps {
  return {
    dispatch
    /*toggleDoneStatusAll(done: boolean) {
      const a = new TodoActions.ToggleDoneStatusAll({ done })
      dispatch(a)
    },
    addTodo(value: string) {
      dispatch(new TodoActions.Add({ value }))
    },
    changeFilter(filter: TodoFilter) {
      dispatch(new TodoActions.ChangeFilter({ value: filter }))
    },*/
  }
}

export const TodosContainer = connect<TodosState, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Todos)
