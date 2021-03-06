import React from 'react'

import { Todo } from '../../types'
import { TodoInput } from '../todo-input'
import { DeleteBtn, ItemBox, ItemInfoBox, Checkbox } from './todo-items.elements'

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
    const { done, value, id } = this.props.todo
    const { isEditMode } = this.state
    return (
      <ItemBox>
        <Checkbox
          id={id}
          type="checkbox"
          checked={done}
          onChange={this.changeStatus}
        />
        <label htmlFor={id} />
        {isEditMode ? (
          <TodoInput
            value={value}
            changeValue={this.changeValue}
            exitEditMode={this.exitEditMode}
            showEditingMode
          />
        ) : (
          <>
            <ItemInfoBox onDoubleClick={this.enterUpdateMode} done={done}>{value}</ItemInfoBox>
            <DeleteBtn onClick={this.deleteItem} />
          </>
        )}
      </ItemBox>
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
