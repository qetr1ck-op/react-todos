import React from 'react'
import { Todo } from '../../models'

interface Props {
  todos: Todo[]
}

export function TodoCount({ todos }: Props) {
  return <div>{todos.length} items left</div>
}
