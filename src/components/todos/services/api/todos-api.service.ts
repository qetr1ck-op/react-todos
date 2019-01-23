import { Todo } from '../../types'
import { uuidByDate } from '../uuid'

let fakeDB: Todo[] = [
  {
    id: uuidByDate(),
    done: false,
    value: 'Learn async Redux',
  },
]

export class TodosApiService {
  async getAll(): Promise<Todo[]> {
    await this.delay()

    return fakeDB
  }

  async addSingle(todo: Todo): Promise<Todo> {
    await this.delay()
    fakeDB = [...fakeDB, todo]

    return todo
  }

  async editSingle(editedTodo: Partial<Todo>): Promise<Todo[]> {
    await this.delay()
    return fakeDB.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...todo, ...editedTodo }
      }
      return todo
    })
  }

  private delay(wait: number = 1000): Promise<any> {
    return new Promise((res) => setTimeout(res, wait))
  }
}
