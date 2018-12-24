import React from 'react'

interface IState {
  value: string
}
interface IProps {
  value: string
  onAdd(prop: any): void
}

export class TodoInput extends React.Component<IProps, IState> {
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

  private keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const ENTER_CODE = 13
    if (e.charCode === ENTER_CODE && this.isValid) {
      this.props.onAdd({ value: this.state.value })
      this.setState({ value: '' })
    }
  }

  private change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    this.setState({ value })
  }

  private get isValid(): boolean {
    return !!this.state.value.length
  }
}
