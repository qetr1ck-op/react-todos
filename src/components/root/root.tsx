import * as React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import { TodosRoutes } from '../todos'

import './root.css'

export class Root extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <TodosRoutes />
        </Switch>
      </Router>
    )
  }
}
