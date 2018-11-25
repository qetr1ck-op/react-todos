import React from 'react'
import { NavLink } from 'react-router-dom'

import './logo.css'

export const Logo = () => {
  return (
    <NavLink to={'/'}>
      <div className="logo" />
    </NavLink>
  )
}
