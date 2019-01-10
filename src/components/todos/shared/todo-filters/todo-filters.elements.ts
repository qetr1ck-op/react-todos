import styled from '@emotion/styled'
import * as React from 'react'
import { NavLink } from 'react-router-dom'

export const Link = styled(NavLink)({
  color: 'inherit',
  margin: '3px',
  padding: '3px 7px',
  textDecoration: 'none',
  borderRadius: '3px',
})

export const activeLinkCss: React.CSSProperties = {
  border: '1px solid #e6a8a8',
}
