import DevTool from 'mobx-react-devtools'
import * as React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { store } from '../../store'
import { Todos } from '../todos'
import './root.css'

export class Root extends React.Component {
  render() {
    return (
      <StoreProvider store={store}>
        <DevTool />
        <Router>
          <Route exact path="/:filter?" component={Todos} />
        </Router>
      </StoreProvider>
    )
  }
}
