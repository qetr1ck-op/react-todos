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

  async addOne({ value }: { value: string }): Promise<Todo[]> {
    await this.delay()

    const newTodo = { id: uuidByDate(), done: false, value }
    return (fakeDB = [...fakeDB, newTodo])
  }

  async updateOne(editedTodo: Partial<Todo>): Promise<Todo[]> {
    await this.delay()
    fakeDB = fakeDB.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...todo, ...editedTodo }
      }
      return todo
    })
    return fakeDB
  }

  async removeOne(deletedTodo: Partial<Todo>): Promise<Todo[]> {
    await this.delay()
    return (fakeDB = fakeDB.filter((todo) => todo.id !== deletedTodo.id))
  }

  async removeAllDone(): Promise<Todo[]> {
    await this.delay()
    return (fakeDB = fakeDB.filter((todo) => !todo.done))
  }

  private delay(wait: number = 1000): Promise<any> {
    return new Promise((res) => setTimeout(res, wait))
  }
}
