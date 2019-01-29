import React from 'react'
import { connect } from 'react-redux'

import style from './todo-item.css'

import { Todo } from '../../models'
import * as fromTodoActions from '../../store/actions'
import { TodoInput } from '../todo-input'

interface State {
  isEditMode: boolean
}
interface Props {
  todo: Todo
}

interface DispatchProps {
  dispatch: any
}

class TodoItem extends React.PureComponent<Props & DispatchProps, State> {
  private dispatch = this.props.dispatch
  state = {
    isEditMode: false,
  }

  render() {
    const { done, value, id } = this.props.todo
    const { isEditMode } = this.state
    return (
      <div className={style.item}>
        <input
          id={id}
          className={style.statusToggle}
          type="checkbox"
          checked={done}
          onChange={this.changeStatus}
        />
        <label className={style.statusLabel} htmlFor={id} />
        {isEditMode ? (
          <TodoInput
            value={value}
            changeValue={this.changeValue}
            exitEditMode={this.exitEditMode}
            cssClasses={[style.editInput]}
          />
        ) : (
          <>
            <label className={style.itemLabel} onDoubleClick={this.enterUpdateMode}>
              {value}
            </label>
            <button className={style.deleteBtn} onClick={this.deleteItem} />
          </>
        )}
      </div>
    )
  }

  private exitEditMode = ({ value }) => {
    this.setState({ isEditMode: false })
    if (value === this.props.todo.value) {
      return
    }
    this.dispatch(fromTodoActions.update.request({ ...this.props.todo, value }))
  }

  private changeValue = ({ value }) => {
    this.setState({ isEditMode: false })
    if (value === this.props.todo.value) {
      return
    }
    this.dispatch(fromTodoActions.update.request({ ...this.props.todo, value }))
  }

  private changeStatus = () => {
    this.dispatch(
      fromTodoActions.update.request({ ...this.props.todo, done: !this.props.todo.done }),
    )
  }

  private enterUpdateMode = () => {
    this.setState({ isEditMode: true })
  }

  private deleteItem = () => {
    this.dispatch(fromTodoActions.remove.request({ id: this.props.todo.id }))
  }
}

export const TodoItemConnected = connect()(TodoItem)
