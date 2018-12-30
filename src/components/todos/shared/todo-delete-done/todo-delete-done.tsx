import React from 'react'

interface Props {
  deleteDoneItems(): void
}

export function TodoDeleteDone({ deleteDoneItems}: Props) {
  return <button onClick={deleteDoneItems}>Clear done</button>
}
