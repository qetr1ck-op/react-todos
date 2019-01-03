import React from 'react'

import style from './todo-filters.css'

import { NavLink } from 'react-router-dom'
import { TodoFilters as TodoFiltersEnum } from '../../enums'

interface Props {
  filters: TodoFiltersEnum[]
}

export const routes = {
  [TodoFiltersEnum.All]: { path: '/', label: 'All' },
  [TodoFiltersEnum.Active]: { path: `/${TodoFiltersEnum.Active}`, label: 'Active' },
  [TodoFiltersEnum.Done]: { path: `/${TodoFiltersEnum.Done}`, label: 'Done' },
}

export function TodoFilters({ filters }: Props) {
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
