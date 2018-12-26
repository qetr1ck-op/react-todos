import React from 'react'
import { Link } from 'react-router-dom'

import { routes, TodoRoute } from '../../todos-routes'

interface Props {
  filters: TodoRoute[]
}

export function TodoFilters({ filters }: Props) {
  return (
    <div>
      {filters.map((filter) => {
        const { label, path } = routes[filter]

        return (
          <Link key={label} to={path}>
            {label}
            {'  '}
          </Link>
        )
      })}
    </div>
  )
}
