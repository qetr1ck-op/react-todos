import { combineEpics } from 'redux-observable'
import * as todosEpics from '../../components/todos/store/epics'

export const rootEpic = combineEpics(...Object.values(todosEpics))
