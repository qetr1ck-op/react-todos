import { uuidByDate } from '@root/services'
import { Todo } from '../../models'

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

  async addOne(todo: Todo): Promise<Todo> {
    await this.delay()
    fakeDB = [...fakeDB, todo]

    return todo
  }

  async editOne(editedTodo: Partial<Todo>): Promise<Todo[]> {
    await this.delay()
    fakeDB = fakeDB.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...todo, ...editedTodo }
      }
      return todo
    })
    return fakeDB
  }

  async deleteOne(deletedTodo: Partial<Todo>): Promise<Todo[]> {
    await this.delay()
    return fakeDB.filter((todo) => todo.id !== deletedTodo.id)
  }

  async deleteAll(): Promise<Todo[]> {
    await this.delay()
    fakeDB = []
    return fakeDB
  }

  private delay(wait: number = 1000): Promise<any> {
    return new Promise((res) => setTimeout(res, wait))
  }
}
