import React from 'react'

import style from './todo-delete.css'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  deleteDoneItems(): void
}

export function TodoDeleteDone({ deleteDoneItems }: Props) {
  return (
    <button className={style.delete} onClick={deleteDoneItems}>
      Clear done
    </button>
  )
}
