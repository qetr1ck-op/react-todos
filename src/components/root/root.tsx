import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Todos } from '../todos'
import './root.css'

export interface IRoute {
  path: string
  label: string
}

export enum TodoRoute {
  All = 'all',
  Active = 'active',
  Done = 'done',
}

export interface IRoutes {
  [TodoRoute.All]: IRoute
  [TodoRoute.Active]: IRoute
  [TodoRoute.Done]: IRoute
}

export const routes: IRoutes = {
  [TodoRoute.All]: { path: '/', label: 'All',  },
  [TodoRoute.Active]: { path: `/${TodoRoute.Active}`, label: 'Active' },
  [TodoRoute.Done]: { path: `/${TodoRoute.Done}`, label: 'Done' },
}

export class Root extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={this.component(TodoRoute.All)} />
          <Route path="/done" render={this.component(TodoRoute.Done)} />
          <Route path="/active" render={this.component(TodoRoute.Active)} />
        </Switch>
      </Router>
    )
  }

  private component(filter: TodoRoute) {
            console.log(filter)
    return (props: any) => <Todos {...props} filter={filter} />
  }
}
