import createBrowserHistory from 'history/createBrowserHistory'
import DevTool from 'mobx-react-devtools'
import { Route, Router } from 'react-router'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import * as React from 'react'

import { Todos, TodosStoreProvider } from '../todos'
import './root.css'

const browserHistory = createBrowserHistory()
const routerStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routerStore)

export function RootPage() {
  return (
    <>


      <Router history={history}>
        <Route
          exact
          path="/:filter?"
          render={(props) => (
            <TodosStoreProvider>
              <Todos {...props} />
            </TodosStoreProvider>
          )}
        />
      </Router>

      <DevTool />
    </>
  )
}
