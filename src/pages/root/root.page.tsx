import { TodosApiService } from '@root/pages/todos/services'
import { TodoStore } from '@root/pages/todos/store'
import { RootStore } from '@root/store'
import createBrowserHistory from 'history/createBrowserHistory'
import { Provider } from 'mobx-react'
import DevTool from 'mobx-react-devtools'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import * as React from 'react'
import { Route, Router } from 'react-router'

import { RootStoreProvider } from '@root/components'

import { Todos } from '../todos'
import './root.css'

const browserHistory = createBrowserHistory()
const routerStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routerStore)

const rootStore = new RootStore({ routerStore })

export class RootPage extends React.Component {
  render() {
    return (
      <>
        <RootStoreProvider store={rootStore}>
          <Router history={history}>
            <Route
              exact
              path="/:filter?"
              render={(props) => (
                <Provider todoStore={new TodoStore(rootStore, new TodosApiService())}>
                  <Todos {...props} />
                </Provider>
              )}
            />
          </Router>
        </RootStoreProvider>

        <DevTool />
      </>
    )
  }
}
