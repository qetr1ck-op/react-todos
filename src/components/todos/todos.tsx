import React from 'react'
import { RouteComponentProps } from 'react-router'
import { Dispatch } from 'redux'

import { connect } from '@root/services'
import * as fromRootStore from '@root/store'

import * as fromTodoActions from './store/actions/todo/todo.actions'
import * as fromTodoSelectors from './store/selectors/todo'

import { Todo, TodoFilter } from './models'
import { TodoCheckAll, TodoInput, TodoList } from './shared'

import style from './todos.css'

interface State {
  isAllChecked: boolean
}

interface StateProps {
  todos: Todo[]
  totalTodos: number
  isLoading: boolean
  isLoadingAdd: boolean
}

interface DispatchProps {
  dispatch: Dispatch<fromRootStore.RootAction>
}

interface RouterProps {
  filter?: string
}

type Props = StateProps & DispatchProps & RouteComponentProps<RouterProps>

function mapStateToProps(state: fromRootStore.RootState, props: Props): StateProps {
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

@connect<StateProps>(mapStateToProps)
export class Todos extends React.PureComponent<Props, State> {
  private dispatch = this.props.dispatch
  state = {
    isAllChecked: false,
  }

  componentDidMount(): void {
    this.dispatch(fromTodoActions.getAll.request())
  }

  render() {
    const { isAllChecked } = this.state
    const { todos, totalTodos, isLoading, isLoadingAdd } = this.props

    return (
      <section className={style.main}>
        {/*<pre>{JSON.stringify(this.state, null, 2)}</pre>*/}
        <h1 className={style.title}>todos</h1>
        <div className={style.header}>
          {!!todos.length && (
            <TodoCheckAll isAllChecked={isAllChecked} checkAll={this.checkAllItems} />
          )}
          <TodoInput
            value=""
            disabled={isLoadingAdd}
            changeValue={({ value }: Todo) => this.dispatch(fromTodoActions.add.request({ value }))}
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


