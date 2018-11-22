import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import './root.css'

export class Root extends React.Component {
  public render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" />
        </Switch>
      </div>
    )
  }
}
