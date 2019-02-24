import { TodosApiService } from '@root/pages/todos/services'
import { TodoStore } from '@root/pages/todos/store'
import React from 'react'

const todoStore = new TodoStore(new TodosApiService())

export const TodosStoreContext = React.createContext(todoStore)

export const TodosStoreProvider: React.FC = ({ children }) => {
  return <TodosStoreContext.Provider value={todoStore}>{children}</TodosStoreContext.Provider>
}
