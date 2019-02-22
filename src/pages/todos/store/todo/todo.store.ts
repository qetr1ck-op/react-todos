import { Todo, TodoFilter } from '@root/pages/todos/models'
import { TodosApiService } from '@root/pages/todos/services'
import { RootStore } from '@root/store'
import { action, computed, observable, reaction } from 'mobx'

// import { TodoModel } from './todo.model'
// import * as Utils from '../utils';

export class TodoStore {
  @computed
  get hasDoneItems() {
    return this.todos.some((todo) => todo.done)
  }

  @observable todos: Todo[] = []
  @observable isLoading = false
  @observable isAddLoading = false
  @observable isAllChecked = false

  constructor(public rootStore: RootStore, private api: TodosApiService) {
    this.subscribeToggleDoneAll()
  }

  visibleTodos(visibilityFilter: TodoFilter) {
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
  async getAll() {
    this.isLoading = true
    try {
      this.todos = await this.api.getAll()
    } catch (e) {
      this.todos = []
    } finally {
      this.isLoading = false
    }
  }
  /*@computed get activeTodoCount() {
    return this.todos.reduce(
      (sum, todo) => sum + (todo.completed ? 0 : 1),
      0
    )
  }*/

  /*@computed get completedCount() {
    return this.todos.length - this.activeTodoCount;
  }*/

  /*subscribeServerToStore() {
    reaction(
      () => this.toJS(),
      todos => window.fetch && fetch('/api/todos', {
        method: 'post',
        body: JSON.stringify({ todos }),
        headers: new Headers({ 'Content-Type': 'application/json' })
      })
    );
  }*/

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
  toggle(done: boolean) {
    this.isAllChecked = done
  }

  @action
  async addTodo(value) {
    this.isAddLoading = true
    try {
      this.todos.push(await this.api.addOne({ value }))
    } catch (e) {
    } finally {
      this.isAddLoading = false
    }
  }
}
