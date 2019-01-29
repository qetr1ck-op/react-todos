import { createAsyncAction, createStandardAction } from 'typesafe-actions'

import { Todo } from '../../../models'

export const getAll = createAsyncAction(
  '[TODO] GET_REQUEST',
  '[TODO] GET_SUCCESS',
  '[TODO] GET_FAILURE',
)<void, Todo[], string>()

export const update = createAsyncAction(
  '[TODO] UPDATE_REQUEST',
  '[TODO] UPDATE_SUCCESS',
  '[TODO] UPDATE_FAILURE',
)<Todo, Todo[], string>()

export const add = createAsyncAction(
  '[TODO] ADD_REQUEST',
  '[TODO] ADD_SUCCESS',
  '[TODO] ADD_FAILURE',
)<{ value: string }, Todo[], Todo[]>()

export const remove = createAsyncAction(
  '[TODO] REMOVE_REQUEST',
  '[TODO] REMOVE_SUCCESS',
  '[TODO] REMOVE_FAILURE',
)<{ id: string }, Todo[], Todo[]>()

export const removeDoneAll = createAsyncAction(
  '[TODO] REMOVE_DONE_REQUEST',
  '[TODO] REMOVE_DONE_SUCCESS',
  '[TODO] REMOVE_DONE_FAILURE',
)<void, Todo[], Todo[]>()

export const toggleDoneStatusAll = createStandardAction('[TODO] TOGGLE_DONE')<{ done: boolean }>()
