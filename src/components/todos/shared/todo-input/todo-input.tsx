import React from 'react'

interface State {
  value: string
}
interface Props {
  value: string
  onAdd(prop: { value: string }): void
}

export class TodoInput extends React.PureComponent<Props, State> {
  state = {
    value: '',
  }

  render() {
    const { value } = this.state
    return (
      <div>
        <input type="text" value={value} onChange={this.change} onKeyPress={this.keyPress} />
      </div>
    )
  }

  private changeValue(value: string): void {
    this.setState({ value })
  }

  // TODO: to render props with global events
  // or https://www.npmjs.com/package/react-keydown
  private keyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const ENTER_CODE = 13
    if (e.charCode === ENTER_CODE && this.isValid) {
      this.props.onAdd({ value: this.state.value })
      this.changeValue('')
    }
  }

  private change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.changeValue(e.target.value)
  }

  private get isValid(): boolean {
    return !!this.state.value.length
  }
}
