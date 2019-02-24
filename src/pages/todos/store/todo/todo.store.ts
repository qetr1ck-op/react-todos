import { Todo, TodoFilter } from '@root/pages/todos/models'
import { TodosApiService } from '@root/pages/todos/services'
import { action, computed, observable, reaction } from 'mobx'

export class TodoStore {
  @computed
  get hasDoneItems() {
    return this.todos.some((todo) => todo.done)
  }

  @observable todos: Todo[] = []
  @observable isLoading = false
  @observable isAddLoading = false
  @observable isAllChecked = false

  constructor(private api: TodosApiService) {
    this.subscribeToggleDoneAll()
  }

  getVisibleTodos(visibilityFilter: TodoFilter | undefined) {
    return this.todos.filter((todo) => {
      switch (visibilityFilter) {
        case TodoFilter.Active:
          return !todo.done
        case TodoFilter.Done:
          return todo.done
        default:
          return true
      }
    })
  }

  @action
  async fetchAll() {
    this.isLoading = true
    try {
      this.todos = await this.api.getAll()
    } catch (e) {
      this.todos = []
    } finally {
      this.isLoading = false
    }
  }
  @action
  async remove(toRemoveTodo: Partial<Todo>) {
    const initTodos = this.todos

    this.todos = this.todos.filter((todo) => todo.id !== toRemoveTodo.id)
    try {
      this.todos = await this.api.removeOne(toRemoveTodo)
    } catch (e) {
      this.todos = initTodos
    }
  }

  @action
  async removeDone() {
    const initTodos = this.todos

    this.todos = this.todos.filter((todo) => !todo.done)
    try {
      await this.api.removeAllDone()
    } catch (e) {
      this.todos = initTodos
    }
  }

  @action
  async update(toUpdateTodo: Todo) {
    const initTodos = this.todos

    this.todos = this.todos.map((todo) => {
      if (todo.id === toUpdateTodo.id) {
        return toUpdateTodo
      }
      return todo
    })

    try {
      await this.api.updateOne(toUpdateTodo)
    } catch (e) {
      this.todos = initTodos
    }
  }

  subscribeToggleDoneAll() {
    reaction(
      () => this.isAllChecked,
      () => {
        this.todos = this.todos.map((todo) => ({ ...todo, done: this.isAllChecked }))
      },
    )
  }

  @action
  toggleStatusAll() {
    this.isAllChecked = !this.isAllChecked
  }

  @action
  async create(value) {
    this.isAddLoading = true
    try {
      this.todos.push(await this.api.addOne({ value }))
    } catch (e) {
    } finally {
      this.isAddLoading = false
    }
  }
}
