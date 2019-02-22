import { inject, observer } from 'mobx-react'
import React from 'react'

import { TodoStore } from '@root/pages/todos/store'

import style from './todo-item.css'

import { Todo } from '../../models'
import { TodoInput } from '../todo-input'

interface State {
  isEditMode: boolean
}
interface Props {
  todo: Todo
}

interface InjectedProps extends Props {
  todoStore: TodoStore
}

@inject('todoStore')
@observer
export class TodoItem extends React.Component<Props, State> {
  state = {
    isEditMode: false,
  }

  private get todosStore() {
    return (this.props as InjectedProps).todoStore
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
    this.todosStore.update({ ...this.props.todo, value })
  }

  private changeValue = ({ value }) => {
    this.setState({ isEditMode: false })
    if (value === this.props.todo.value) {
      return
    }
    this.todosStore.update({ ...this.props.todo, value })
  }

  private changeStatus = () => {
    this.todosStore.update({ ...this.props.todo, done: !this.props.todo.done })
  }

  private enterUpdateMode = () => {
    this.setState({ isEditMode: true })
  }

  private deleteItem = () => {
    this.todosStore.remove({ id: this.props.todo.id })
  }
}
