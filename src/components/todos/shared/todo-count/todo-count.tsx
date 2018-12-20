import React from 'react'
import { ITodo } from '../../todos'

interface IState {}
interface IProps {
  todos: ITodo[]
}

export class TodoCount extends React.Component<IProps, IState> {
  render() {
    const { todos } = this.props
    return (
      <div>
        {todos.length}{' '}items left
      </div>
    )
  }
}
