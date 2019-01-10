import React from 'react'

import { TodoFilters as TodoFiltersEnum } from '../../enums'
import { activeLinkCss, Link } from './todo-filters.elements'

interface Props {
  filters: TodoFiltersEnum[]
}

export const routes = {
  [TodoFiltersEnum.All]: { path: '/', label: 'All' },
  [TodoFiltersEnum.Active]: { path: `/${TodoFiltersEnum.Active}`, label: 'Active' },
  [TodoFiltersEnum.Done]: { path: `/${TodoFiltersEnum.Done}`, label: 'Done' },
}

export const TodoFilters: React.FunctionComponent<Props> = ({ filters }) => (
  <div>
    {filters.map((filter) => {
      const { label, path } = routes[filter]

      return (
        <Link key={label} to={path} exact activeStyle={activeLinkCss}>
          {label}
          {'  '}
        </Link>
      )
    })}
  </div>
)
