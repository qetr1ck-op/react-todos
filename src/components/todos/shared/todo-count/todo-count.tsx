import React from 'react'
import { Todo } from '../../types'

interface Props {
  todos: Todo[]
}

export function TodoCount({ todos }: Props) {
  return <div>{todos.length} items left</div>
}
