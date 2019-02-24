import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'

import { TodoCheckAll, TodoInput, TodoList, TodosStoreContext } from './components'
import { Todo, TodoFilter } from './models'

import style from './todos.css'

interface RouterProps {
  filter?: TodoFilter
}
type Props = RouteComponentProps<RouterProps>

export const Todos: React.FC<Props> = observer((props) => {
  const todosStore = useContext(TodosStoreContext)
  const visibleTodos = todosStore.getVisibleTodos(props.match.params.filter)

  useEffect(() => {
    todosStore.fetchAll()
  }, [])

  return (
    <section className={style.main}>
      {/*<pre>{JSON.stringify(this.state, null, 2)}</pre>*/}
      <h1 className={style.title}>todos</h1>
      <div className={style.header}>
        {!!visibleTodos.length && (
          <TodoCheckAll
            isAllChecked={todosStore.isAllChecked}
            checkAll={todosStore.toggleStatusAll}
          />
        )}
        <TodoInput
          value=""
          disabled={todosStore.isAddLoading}
          changeValue={({ value }: Todo) => todosStore.create(value)}
        />
      </div>

      {todosStore.isLoading ? (
        <div>Loading...</div>
      ) : (
        <TodoList
          todos={visibleTodos}
          totalTodos={todosStore.todos.length}
          hasDoneItems={todosStore.hasDoneItems}
        />
      )}
    </section>
  )
})
