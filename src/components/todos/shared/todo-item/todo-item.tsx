import React from 'react'

import style from './todo-item.css';

import { Todo } from '../../types'
import { TodoInput } from '../todo-input'

interface State {
  isEditMode: boolean
}
interface Props {
  todo: Todo
  statusChange(changes: { id: string }): void
  valueChange(changes: { id: string; value: string }): void
  deleteItem(changes: { id: string }): void
}

export class TodoItem extends React.PureComponent<Props, State> {
  state = {
    isEditMode: false,
  }

  render() {
    const { done, value } = this.props.todo
    const { isEditMode } = this.state
    return (
      <div className={style.item}>
        <input type="checkbox" checked={done} onChange={this.changeStatus} />
        {isEditMode ? (
          <TodoInput
            value={value}
            changeValue={this.changeValue}
            exitEditMode={this.exitEditMode}
          />
        ) : (
          <>
            <label onDoubleClick={this.enterUpdateMode}>{value}</label>
            <button onClick={this.deleteItem}>X</button>
          </>
        )}
      </div>
    )
  }

  private exitEditMode = ({ value }) => {
    const { id } = this.props.todo

    this.setState({ isEditMode: false })
    this.props.valueChange({ id, value })
  }

  private changeValue = ({ value }) => {
    this.setState({ isEditMode: false })
    this.props.valueChange({ id: this.props.todo.id, value })
  }

  private changeStatus = () => {
    this.props.statusChange({ id: this.props.todo.id! })
  }

  private enterUpdateMode = () => {
    this.setState({ isEditMode: true })
  }

  private deleteItem = () => {
    this.props.deleteItem({ id: this.props.todo.id })
  }
}
