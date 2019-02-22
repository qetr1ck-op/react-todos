import classNames from 'classnames'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'

import style from './todo-input.css'

interface Props {
  value: string
  disabled?: boolean
  cssClasses?: string[]
  changeValue?(prop: { value: string }): void
  exitEditMode?(prop: { value: string }): void
}

@observer
export class TodoInput extends React.Component<Props> {
  private get isValid(): boolean {
    return !!this.value.length
  }

  @observable value = ''

  elRef = React.createRef<HTMLInputElement>()

  componentDidMount(): void {
    this.value = this.props.value
    this.elRef.current!.focus()
  }

  componentDidUpdate() {
    document.addEventListener('click', this.exitEditMode)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.exitEditMode)
  }

  render() {
    return (
      <input
        type="text"
        placeholder="What needs to be done?"
        className={classNames([style.input, this.props.cssClasses])}
        value={this.value}
        ref={this.elRef}
        disabled={this.props.disabled}
        onChange={this.change}
        onKeyPress={this.keyPress}
      />
    )
  }

  private keyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const ENTER_CODE = 13
    if (e.charCode === ENTER_CODE && this.isValid) {
      if (this.props.changeValue) {
        this.props.changeValue({ value: this.value })
      }
      this.value = ''
    }
  }

  private change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.value = e.target.value
  }

  private exitEditMode = (e: MouseEvent) => {
    if ((this.elRef.current as HTMLDivElement).contains(e.target as HTMLElement)) {
      return
    }
    if (this.props.exitEditMode) {
      this.props.exitEditMode({ value: this.value })
    }
  }
}
