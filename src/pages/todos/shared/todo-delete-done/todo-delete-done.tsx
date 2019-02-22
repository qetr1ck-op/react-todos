import { inject, observer } from 'mobx-react'
import React from 'react'

import { TodoStore } from '@root/pages/todos/store'

import style from './todo-delete.css'

interface InjectedProps {
  todoStore: TodoStore
}

@inject('todoStore')
@observer
export class TodoDeleteDone extends React.Component {
  render() {
    return (
      <button
        className={style.deleteBtn}
        onClick={() => (this.props as InjectedProps).todoStore.removeDone()}>
        Clear done
      </button>
    )
  }
}
