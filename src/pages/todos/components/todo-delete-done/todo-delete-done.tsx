import React, { useContext } from 'react'

import { TodosStoreContext } from '@root/pages/todos/components'

import style from './todo-delete.css'

export function TodoDeleteDone() {
  const todosStore = useContext(TodosStoreContext)

  return (
    <button className={style.deleteBtn} onClick={() => todosStore.removeDone()}>
      Clear done
    </button>
  )
}
