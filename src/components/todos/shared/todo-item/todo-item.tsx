import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import * as fromTodoActions from '../../store/actions/todo'

import style from './todo-item.css'

import { Todo } from '../../types'
import { TodoInput } from '../todo-input'

interface State {
  isEditMode: boolean
}
interface Props {
  todo: Todo
}

interface DispatchProps {
  dispatch: Dispatch<fromTodoActions.TodoActions>
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
    const { id } = this.props.todo

    this.setState({ isEditMode: false })
    this.dispatch(new fromTodoActions.Edit({ id, value }))
  }

  private changeValue = ({ value }) => {
    this.setState({ isEditMode: false })
    this.dispatch(new fromTodoActions.Edit({ id: this.props.todo.id, value }))
  }

  private changeStatus = () => {
    const { id, done } = this.props.todo

    this.dispatch(new fromTodoActions.Edit({ id, done: !done }))
  }

  private enterUpdateMode = () => {
    this.setState({ isEditMode: true })
  }

  private deleteItem = () => {
    this.dispatch(new fromTodoActions.DeleteOne({ id: this.props.todo.id }))
  }
}

export const TodoItemConnected = connect()(TodoItem)
