import * as React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from '../../services/store'

import { TodosContainer } from '../todos'
import './root.css'

export class Root extends React.Component {
  render() {
    return (
      <StoreProvider store={store}>
        <Router>
          <TodosContainer />
        </Router>
      </StoreProvider>
    )
  }
}
