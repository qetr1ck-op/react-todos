import React, { PureComponent } from 'react'
import './header-root.css'
import { Logo, Search } from './shared'

export class HeaderRoot extends PureComponent {
  render() {
    return (
      <div className="header-root">
        <Logo />
        <Search />
      </div>
    )
  }
}
