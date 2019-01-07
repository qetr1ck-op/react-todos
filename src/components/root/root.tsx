import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { Todos } from '../todos'
import './root.css'

export class Root extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Todos />
        </Router>
      </div>
    )
  }
}
