import React from 'react'
import { TodoFilter } from '../../todos'

interface IState {}
interface IProps {
  activeFilter: TodoFilter,
  filters: TodoFilter[]
}

export class TodoFilters extends React.Component<IProps, IState> {
  render() {
    const { filters } = this.props
    return (
      <div>
        {filters.map(filter => (<button key={filter} onClick={this.change.bind(this, filter)}>{filter}</button>))}
      </div>
    )
  }

  private change(filter: TodoFilter) {
    console.log(filter);
  }
}
