import { RootAction, RootService, RootState } from '@root/store'
import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, switchMap } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'

import * as fromTodoActions from '../../actions'

// TODO: errors

export const getEpic: Epic<RootAction, RootAction, RootState, RootService> = (
  action$,
  state$,
  { api },
) => {
  return action$.pipe(
    filter(isActionOf(fromTodoActions.getAll.request)),
    switchMap(() => {
      return from(api.getAll()).pipe(
        map(fromTodoActions.getAll.success),
        catchError((err: string) => of(fromTodoActions.getAll.failure(err))),
      )
    }),
  )
}

export const addEpic: Epic<RootAction, RootAction, RootState, RootService> = (
  action$,
  state$,
  { api },
) => {
  return action$.pipe(
    filter(isActionOf(fromTodoActions.add.request)),
    switchMap((action) => {
      return from(api.addOne(action.payload)).pipe(
        map(fromTodoActions.add.success),
        catchError((err: string) => of(fromTodoActions.add.failure(err as any))),
      )
    }),
  )
}

export const updateEpic: Epic<RootAction, RootAction, RootState, RootService> = (
  action$,
  state$,
  { api },
) => {
  return action$.pipe(
    filter(isActionOf(fromTodoActions.update.request)),
    switchMap((action) => {
      return from(api.updateOne(action.payload)).pipe(
        map(fromTodoActions.update.success),
        catchError((err: string) => of(fromTodoActions.add.failure(err as any))),
      )
    }),
  )
}

export const removeEpic: Epic<RootAction, RootAction, RootState, RootService> = (
  action$,
  state$,
  { api },
) => {
  return action$.pipe(
    filter(isActionOf(fromTodoActions.remove.request)),
    switchMap((action) => {
      return from(api.removeOne(action.payload)).pipe(
        map(fromTodoActions.remove.success),
        catchError((err: string) => of(fromTodoActions.remove.failure(err as any))),
      )
    }),
  )
}

export const removeAllDoneEpic: Epic<RootAction, RootAction, RootState, RootService> = (
  action$,
  state$,
  { api },
) => {
  return action$.pipe(
    filter(isActionOf(fromTodoActions.removeDoneAll.request)),
    switchMap((action) => {
      return from(api.removeAllDone()).pipe(
        map(fromTodoActions.removeDoneAll.success),
        catchError((err: string) => of(fromTodoActions.removeDoneAll.failure(err as any))),
      )
    }),
  )
}
