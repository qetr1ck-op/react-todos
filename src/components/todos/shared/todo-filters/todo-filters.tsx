import React from 'react'
import { Link } from 'react-router-dom'

import { routes, TodoRoute } from '../../../root'

interface IState {}
interface IProps {
  filters: TodoRoute[]
}

export class TodoFilters extends React.Component<IProps, IState> {
  render() {
    const { filters } = this.props
    return (
      <div>
        {filters.map((filter) => {
          const route = routes[filter]

          return (
            <Link key={route.label} to={route.path}>
              {route.label}{'  '}
            </Link>
          )
        })}
      </div>
    )
  }
}
