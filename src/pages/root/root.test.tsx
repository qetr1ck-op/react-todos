import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { RootPage } from './root.page'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<RootPage />, div)
  ReactDOM.unmountComponentAtNode(div)
})
