import React from 'react'
import { connect } from 'react-redux'

import * as fromTodoActions from '../../store/actions/todo/todo.actions'

import style from './todo-delete.css'

interface DispatchProps {
  dispatch: any
}

const TodoDeleteDone: React.FunctionComponent<DispatchProps> = ({ dispatch }) => {
  return (
    <button
      className={style.deleteBtn}
      onClick={() => dispatch(fromTodoActions.removeDoneAll.request())}>
      Clear done
    </button>
  )
}

export const TodoDeleteDoneConnected = connect()(TodoDeleteDone)
