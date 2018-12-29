import React from 'react'

interface State {
  value: string
}
interface Props {
  value: string
  changeValue?(prop: { value: string }): void
  exitEditMode?(prop: { value: string }): void
}

export class TodoInput extends React.PureComponent<Props, State> {
  private get isValid(): boolean {
    return !!this.state.value.length
  }
  state = {
    value: '',
  }

  elRef = React.createRef<HTMLInputElement>()

  componentDidMount(): void {
    this.setState({ value: this.props.value })
  }

  componentDidUpdate() {
    document.addEventListener('click', this.exitEditMode)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.exitEditMode)
  }

  render() {
    const { value } = this.state
    return (
      <input
        type="text"
        value={value}
        ref={this.elRef}
        onChange={this.change}
        onKeyPress={this.keyPress}
      />
    )
  }

  private keyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const ENTER_CODE = 13
    if (e.charCode === ENTER_CODE && this.isValid) {
      this.setState({ value: '' })
      if (this.props.changeValue) {
        this.props.changeValue({ value: this.state.value })
      }
    }
  }

  private change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ value: e.target.value })
  }

  private exitEditMode = (e: MouseEvent) => {
    if ((this.elRef.current as HTMLDivElement).contains(e.target as HTMLElement)) {
      return
    }
    if (this.props.exitEditMode) {
      this.props.exitEditMode({ value: this.state.value })
    }
  }
}
