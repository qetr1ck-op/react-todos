import { inject, observer } from 'mobx-react'
import React from 'react'
import { RouteComponentProps } from 'react-router'

import { TodoStore } from './store/todo'

import { Todo, TodoFilter } from './models'
import { TodoCheckAll, TodoInput, TodoList } from './shared'

import style from './todos.css'

interface RouterProps {
  filter?: TodoFilter
}
type Props = RouteComponentProps<RouterProps>
type InjectedProps = Props & { todoStore: TodoStore }

@inject('todoStore')
@inject('routerStore')
@observer
export class Todos extends React.Component<Props> {
  async componentDidMount(): Promise<void> {
    await this.todoStore.getAll()
  }

  render() {
    const todoStore = this.todoStore
    const visibleTodos = todoStore.visibleTodos(this.props.match.params.filter!)

    return (
      <section className={style.main}>
        {/*<pre>{JSON.stringify(this.state, null, 2)}</pre>*/}
        <h1 className={style.title}>todos</h1>
        <div className={style.header}>
          {!!visibleTodos.length && (
            <TodoCheckAll isAllChecked={todoStore.isAllChecked} checkAll={this.checkAllItems} />
          )}
          <TodoInput
            value=""
            disabled={todoStore.isAddLoading}
            changeValue={({ value }: Todo) => todoStore.addTodo(value)}
          />
        </div>

        {todoStore.isLoading ? (
          <div>Loading...</div>
        ) : (
          <TodoList
            todos={visibleTodos}
            totalTodos={todoStore.todos.length}
            hasDoneItems={todoStore.hasDoneItems}
          />
        )}
      </section>
    )
  }

  private get todoStore(): TodoStore {
    return (this.props as InjectedProps).todoStore
  }

  private checkAllItems = () => {
    this.todoStore.toggle(!this.todoStore.isAllChecked)
  }
}
