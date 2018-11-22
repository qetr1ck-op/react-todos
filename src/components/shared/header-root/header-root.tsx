import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'

export class HeaderRoot extends PureComponent {
  render() {
    return <div>
      <NavLink to={'/'}>Root</NavLink>
    </div>
  }
}
