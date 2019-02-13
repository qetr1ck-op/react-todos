import { observer } from 'mobx-react'
import React from 'react'
import { RouteComponentProps } from 'react-router'

// import * as fromRootStore from '@root/store'

// import * as fromTodoActions from './store/actions/todo/todo.actions'
// import * as fromTodoSelectors from './store/selectors/todo'

import { TodoStore } from './store/todo'

import { Todo } from './models'
import { TodoCheckAll, TodoInput, TodoList } from './shared'

import style from './todos.css'

interface State {
  isAllChecked: boolean
  todosState: TodoStore
}

/*interface StateProps {
  todos: Todo[]
  totalTodos: number
  isLoading: boolean
  isLoadingAdd: boolean
}*/

/*interface DispatchProps {
  dispatch: Dispatch<fromRootStore.RootAction>
}*/

interface RouterProps {
  filter?: string
}

type Props = RouteComponentProps<RouterProps>

/*function mapStateToProps(state: fromRootStore.RootState, props: Props): StateProps {
  return {
    todos: fromTodoSelectors.getFilteredTodos(
      state,
      (props.match.params.filter as TodoFilter) || TodoFilter.All,
    ),
    isLoading: fromTodoSelectors.isLoading(state),
    isLoadingAdd: fromTodoSelectors.isAddLoading(state),
    totalTodos: fromTodoSelectors.getTodoList(state).length,
  }
}*/

@observer
export class Todos extends React.PureComponent<Props, State> {
  state = {
    isAllChecked: false,
    todosState: new TodoStore(),
  }

  /*componentDidMount(): void {
    this.dispatch(fromTodoActions.getAll.request())
  }*/

  render() {
    const { isAllChecked, todosState } = this.state
    const isLoadingAdd = false
    const isLoading = false
    // const { todos, totalTodos, isLoading, isLoadingAdd } = this.props

    return (
      <section className={style.main}>
        {/*<pre>{JSON.stringify(this.state, null, 2)}</pre>*/}
        <h1 className={style.title}>todos</h1>
        <div className={style.header}>
          {!!todosState.totalItems && (
            <TodoCheckAll isAllChecked={isAllChecked} checkAll={this.checkAllItems} />
          )}
          <TodoInput
            value=""
            disabled={isLoadingAdd}
            changeValue={({ value }: Todo) => todosState.addTodo(value)}
          />
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <TodoList
            todos={todosState.todos}
            totalTodos={todosState.totalItems}
            hasDoneItems={todosState.hasDoneItems}
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
    // this.dispatch(fromTodoActions.toggleDoneStatusAll({ done: !this.state.isAllChecked }))
  }
}
