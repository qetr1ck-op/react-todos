import React from 'react'
import { Todo } from '../../types'

interface Props {
  todos: Todo[]
}

export const TodoCount: React.FunctionComponent<Props> = ({ todos }) => (
  <div>{todos.length} items left</div>
)
