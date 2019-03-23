import React from 'react'
import Component from '@/Component'
import classs from 'classnames'
import { string, func, bool } from 'prop-types'

class Input extends Component {
  static propTypes = {
    name: string.isRequired,
    placeholder: string,
    change: func.isRequired,
    icon: string,
    type: string,
    defalutValue: string,
    disabled: bool
  }

  static defaultProps = {
    placeholder: '',
    icon: '',
    type: 'text',
    defalutValue: '',
    disabled: false
  }

  state = {
    value: ''
  }

  change(e) {
    this.setState({ value: e.target.value })
    this.props.change(this.props.name, e.target.value)
  }

  render() {
    const { name, placeholder, icon, type, defalutValue, disabled } = this.props
    return (<div className={classs(!!icon ? 'c-input-padding' : 'c-input')}>
      {!!icon && <div className="c-input-icon">
        <i className={icon} />
      </div>}
      <input
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        name={name}
        value={defalutValue || this.state.value}
        onChange={this.change.bind(this)}
      />
    </div>)
  }
}

export default Input