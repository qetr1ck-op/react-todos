import { TodosStoreContext } from '@root/pages/todos/components'
import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'

import style from './todo-item.css'

import { Todo } from '../../models'
import { TodoInput } from '../todo-input'

interface Props {
  todo: Todo
}

export const TodoItem: React.FC<Props> = observer(({ todo }) => {
  const todosStore = useContext(TodosStoreContext)
  const [isEditMode, setEditMode] = useState(false)

  return (
    <div className={style.item}>
      <input
        id={todo.id}
        className={style.statusToggle}
        type="checkbox"
        checked={todo.done}
        onChange={changeStatus}
      />
      <label className={style.statusLabel} htmlFor={todo.id} />
      {isEditMode ? (
        <TodoInput
          value={todo.value}
          changeValue={changeValue}
          exitEditMode={exitEditMode}
          cssClasses={[style.editInput]}
        />
      ) : (
        <>
          <label className={style.itemLabel} onDoubleClick={enterUpdateMode}>
            {todo.value}
          </label>
          <button className={style.deleteBtn} onClick={deleteItem} />
        </>
      )}
    </div>
  )

  function exitEditMode({ value }) {
    setEditMode(false)
    if (value === todo.value) {
      return
    }
    todosStore.update({ ...todo, value })
  }

  function changeValue({ value }) {
    setEditMode(false)
    if (value === todo.value) {
      return
    }
    todosStore.update({ ...todo, value })
  }

  function changeStatus() {
    todosStore.update({ ...todo, done: !todo.done })
  }

  function enterUpdateMode() {
    setEditMode(true)
  }

  function deleteItem() {
    todosStore.remove({ id: todo.id })
  }
})
