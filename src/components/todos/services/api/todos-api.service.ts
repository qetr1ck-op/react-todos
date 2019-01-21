import { Todo } from '../../types'
import { uuidByDate } from '../uuid'

let todos: Todo[] = [
  {
    id: uuidByDate(),
    done: false,
    value: 'Learn async Redux',
  },
]

export class TodosApiService {
  async getAll(): Promise<Todo[]> {
    await this.delay()
    return todos
  }

  async addSingle(todo: Todo): Promise<Todo> {
    await this.delay()
    return todo
  }

  async editSingle(editedTodo: Partial<Todo>): Promise<Todo[]> {
    await this.delay()
    let r = todos.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...todo, ...editedTodo }
      }
      return todo
    })
    console.log(r)
    return r
  }

  private delay(wait: number = 1000): Promise<any> {
    return new Promise((res) => setTimeout(res, wait))
  }
}
