import React, { ComponentLifecycle } from 'react'
import { ITodo } from '../../todos'

interface IState {
  isEditMode: boolean
  value: string
}
interface IProps {
  todo: ITodo
  statusChange(changes: { id: string }): void
  delete(changes: { id: string }): void
  valueChange(changes: { id: string; value: string }): void
}

export class TodoItem extends React.Component<IProps, IState>
  implements ComponentLifecycle<IProps, IState> {
  private get isValid(): boolean {
    return !!this.state.value.length
  }

  state = {
    isEditMode: false,
    value: '',
  }

  private elRef = React.createRef<HTMLDivElement>()
  componentDidMount() {
    this.setState({ value: this.props.todo.value })
  }
  render() {
    const { done } = this.props.todo
    const { isEditMode, value } = this.state
    return (
      <div ref={this.elRef}>
        <input type="checkbox" checked={done} onChange={this.changeStatus} />
        {isEditMode ? (
          <input type="text" value={value} onChange={this.changeValue} onKeyPress={this.keyPress} />
        ) : (
          <>
            <label onDoubleClick={this.enterUpdateMode}>{value}</label>
            <button onClick={this.delete}>X</button>
          </>
        )}
      </div>
    )
  }

  componentDidUpdate() {
    document.addEventListener('click', this.exitEditMode)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.exitEditMode)
  }

  private exitEditMode = (e: MouseEvent) => {
    const { id, value } = this.props.todo
    if (!this.state.isEditMode || this.elRef.current!.contains(e.target as HTMLElement)) {
      return
    }
    this.setState({ isEditMode: false })
    this.props.valueChange({ id, value })
  }

  private changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.isValid) {
      this.setState({ value: e.target.value })
    }
  }

  private changeStatus = () => {
    this.props.statusChange({ id: this.props.todo.id! })
  }

  private enterUpdateMode = () => {
    this.setState({ isEditMode: true })
  }

  private keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const ENTER_CODE = 13
    if (e.charCode === ENTER_CODE && this.isValid) {
      this.setState({ value: (e.target as HTMLInputElement).value, isEditMode: false })
      this.props.valueChange({ id: this.props.todo.id, value: this.state.value })
    }
  }

  private delete = () => {
    this.props.delete({ id: this.props.todo.id })
  }
}
