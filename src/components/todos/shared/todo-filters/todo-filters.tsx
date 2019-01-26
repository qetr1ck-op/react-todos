import React from 'react'
import { NavLink } from 'react-router-dom'

import style from './todo-filters.css'

import { TodoFilter } from '../../models'

export const routes = {
  [TodoFilter.All]: { path: '/', label: 'All' },
  [TodoFilter.Active]: { path: `/${TodoFilter.Active}`, label: 'Active' },
  [TodoFilter.Done]: { path: `/${TodoFilter.Done}`, label: 'Done' },
}

const filters = [TodoFilter.All, TodoFilter.Active, TodoFilter.Done]

export function TodoFilters() {
  return (
    <div>
      {filters.map((filter) => {
        const { label, path } = routes[filter]

        return (
          <NavLink key={label} to={path} exact activeClassName={style.navActive}>
            {label}
            {'  '}
          </NavLink>
        )
      })}
    </div>
  )
}
