import React from 'react'

import { Btn } from './todo-delete.elements'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  deleteDoneItems(): void
}

export const TodoDeleteDone: React.FunctionComponent<Props> = ({ deleteDoneItems }) => (
  <Btn onClick={deleteDoneItems}>Clear done</Btn>
)
