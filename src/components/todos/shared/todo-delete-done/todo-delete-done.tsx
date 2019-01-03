import React from 'react'

import style from './todo-delete.css'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  deleteDoneItems(): void
}

export function TodoDeleteDone({ deleteDoneItems }: Props) {
  return (
    <button className={style.deleteBtn} onClick={deleteDoneItems}>
      Clear done
    </button>
  )
}
