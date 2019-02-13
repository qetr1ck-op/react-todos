import { Todo } from '@root/components/todos/models'
import { uuidByDate } from '@root/services'
import { action, computed, observable } from 'mobx'

import { TodoModel } from './todo.model'
// import * as Utils from '../utils';

export class TodoStore {
  @observable
  todos: Todo[] = [{ value: 'Learn MobX', done: false, id: '111' }]

  @computed
  get totalItems() {
    return this.todos.length
  }

  @computed
  get hasDoneItems() {
    return this.todos.some((todo) => todo.done)
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
  addTodo (value) {
    this.todos.push(new TodoModel(this, uuidByDate(), value, false));
  }

  /*
    @action
    toggleAll (checked) {
      this.todos.forEach(
        todo => todo.completed = checked
      );
    }

    @action
    clearCompleted () {
      this.todos = this.todos.filter(
        todo => !todo.completed
      );
    }

    toJS() {
      return this.todos.map(todo => todo.toJS());
    }*/

  static fromJS(array) {
    const todoStore = new TodoStore()
    todoStore.todos = array.map((item) => TodoModel.fromJS(todoStore, item))
    return todoStore
  }
}
