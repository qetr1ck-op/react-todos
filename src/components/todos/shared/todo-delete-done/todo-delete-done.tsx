import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import * as fromTodoActions from '../../store'

import style from './todo-delete.css'

interface DispatchProps {
  dispatch: Dispatch<fromTodoActions.TodoActions>
}

const TodoDeleteDone: React.FunctionComponent<DispatchProps> = ({ dispatch }) => {
  return (
    <button
      className={style.deleteBtn}
      onClick={() => dispatch(new fromTodoActions.DeleteAllDone())}>
      Clear done
    </button>
  )
}

export const TodoDeleteDoneConnected = connect()(TodoDeleteDone)
