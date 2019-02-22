import { observable } from 'mobx'

export class TodoModel {
  store
  id
  @observable value
  @observable done

  constructor(store, id, value, done) {
    this.store = store
    this.id = id
    this.value = value
    this.done = done
  }

  toggle() {
    this.done = !this.done
  }

  destroy() {
    this.store.todos.remove(this)
  }

  setTitle(value) {
    this.value = value
  }

  toJS() {
    return {
      id: this.id,
      value: this.value,
      done: this.done,
    }
  }

  static fromJS(store, object) {
    return new TodoModel(store, object.id, object.value, object.done)
  }
}
