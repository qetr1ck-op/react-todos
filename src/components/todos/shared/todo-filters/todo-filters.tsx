import React from 'react'

import { TodoFilters as TodoFiltersEnum } from '../../enums'
import { ActiveNavigationCss, NavigationLink } from './todo-filters.elements'

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
          <NavigationLink key={label} to={path} exact activeStyle={ActiveNavigationCss}>
            {label}
            {'  '}
          </NavigationLink>
        )
      })}
    </div>
  )
}
