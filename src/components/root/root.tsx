import * as React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { store } from '../../store'

import { TodosConnected } from '../todos'
import './root.css'

export class Root extends React.Component {
  render() {
    return (
      <StoreProvider store={store}>
        <Router>
          <Route exact path="/:filter?" component={TodosConnected}/>
          {/*<TodosContainer />*/}
        </Router>
      </StoreProvider>
    )
  }
}
