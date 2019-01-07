import styled from '@emotion/styled'
import * as React from 'react'
import { NavLink } from 'react-router-dom'

export const NavigationLink = styled(NavLink)({
  color: 'inherit',
  margin: '3px',
  padding: '3px 7px',
  textDecoration: 'none',
  borderRadius: '3px',
})

export const ActiveNavigationCss:React.CSSProperties = {
  border: '1px solid #e6a8a8',
}
