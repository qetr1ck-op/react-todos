import { TodosApiService } from '../../components/todos/services'

export const rootService = {
  api: new TodosApiService(),
}

export type RootService = typeof rootService
