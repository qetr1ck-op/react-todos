import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import * as fromRootState from '../../store/root'
import * as fromTodoActions from './store/actions/todo'
import * as fromTodoSelectors from './store/selectors/todo'

import { TodoFilter } from './enums'
import { TodoCheckAll, TodoInput, TodoList } from './shared'
import { Todo } from './types'

import style from './todos.css'

interface State {
  isAllChecked: boolean
}

interface RouterProps {
  filter?: string
}

interface StateProps {
  todos: Todo[]
  totalTodos: number
  isLoading: boolean
  isLoadingAdd: boolean
}

interface DispatchProps {
  dispatch: any
}

type Props = StateProps & DispatchProps & RouteComponentProps<RouterProps>

class Todos extends React.PureComponent<Props, State> {
  private dispatch = this.props.dispatch
  state = {
    isAllChecked: false,
  }

  componentDidMount(): void {
    this.dispatch(fromTodoActions.get())
  }

  render() {
    const { isAllChecked } = this.state
    const { todos, totalTodos, isLoading, isLoadingAdd } = this.props

    return (
      <section className={style.main}>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <h1 className={style.title}>todos</h1>
        <div className={style.header}>
          {!!todos.length && (
            <TodoCheckAll isAllChecked={isAllChecked} checkAll={this.checkAllItems} />
          )}
          <TodoInput
            value=""
            disabled={isLoadingAdd}
            changeValue={({ value }: Todo) => this.dispatch(fromTodoActions.add({ value }))}
          />
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <TodoList
            todos={todos}
            totalTodos={totalTodos}
            hasDoneItems={fromTodoSelectors.hasDoneTodos(todos)}
          />
        )}
      </section>
    )
  }

  private checkAllItems = () => {
    this.setState((state: State) => {
      return {
        isAllChecked: !state.isAllChecked,
      }
    })
    this.dispatch(fromTodoActions.toggleDoneStatusAll({ done: !this.state.isAllChecked }))
  }
}

function mapStateToProps(state: fromRootState.RootState, props: Props): StateProps {
  return {
    todos: fromTodoSelectors.getFilteredTodos(
      state,
      (props.match.params.filter as TodoFilter) || TodoFilter.All,
    ),
    isLoading: fromTodoSelectors.isLoading(state),
    isLoadingAdd: fromTodoSelectors.isAddLoading(state),
    totalTodos: fromTodoSelectors.getTodoList(state).length,
  }
}

export const TodosConnected = connect<StateProps>(mapStateToProps)(Todos)
