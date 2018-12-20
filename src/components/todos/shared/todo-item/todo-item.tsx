import React from 'react'
import { ITodo } from '../../todos'

interface IState {
  isEditMode: boolean
}
interface IProps {
  todo: ITodo
  statusChange(changes: { id: string }): void
  valueChange(changes: { id: string; value: string }): void
}

export class TodoItem extends React.Component<IProps, IState> {
  state = {
    isEditMode: false,
  }

  private elRef = React.createRef<HTMLDivElement>()
  render() {
    const { value, done } = this.props.todo
    const { isEditMode } = this.state
    return (
      <div ref={this.elRef}>
        <input type="checkbox" checked={done} onChange={this.changeStatus} />
        {isEditMode ? (
          <input type="text" value={value} onChange={this.changeValue} />
        ) : (
          <label onDoubleClick={this.enterUpdateMode}>{value}</label>
        )}
      </div>
    )
  }

  componentDidUpdate() {
    document.addEventListener('click', this.clickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickOutside)
  }

  clickOutside = (e: MouseEvent) => {
    if (!this.state.isEditMode || this.elRef.current!.contains(e.target as HTMLElement)) {
      return
    }
    this.setState({ isEditMode: false })
  }
  private changeStatus = () => {
    this.props.statusChange({ id: this.props.todo.id! })
  }

  private changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.valueChange({ id: this.props.todo.id!, value: e.target.value })
  }

  private enterUpdateMode = () => {
    this.setState({ isEditMode: true })
  }
}
