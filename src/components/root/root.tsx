import * as React from 'react'
import { Route, Router, Switch } from 'react-router-dom'

import createBrowserHistory from 'history/createBrowserHistory'
import { Pulls } from '../pulls'
import { HeaderRoot } from '../shared/header-root'
import './root.css'

const NotFound = () => <div>Not found page</div>

export class Root extends React.Component {
  render() {
    return (
      <Router history={createBrowserHistory()}>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Pulls} />
            <Route component={NotFound} />
          </Switch>
          <HeaderRoot />
        </div>
      </Router>
    )
  }
}
