import React from 'react'
import Component from '@/Component'
import classs from 'classnames'
import { string, func, number } from 'prop-types'

class Input extends Component {
  static propTypes = {
    text: string.isRequired,
    change: func.isRequired,
    name: string.isRequired,
    type: number
  }

  static defaultProps = {
    type: 0
  }

  change() {
    this.props.change(this.props.name)
  }

  render() {
    const { text, type } = this.props
    return (<div 
      className={classs('c-button', `c-button-${['default', 'hollow', 'cancel'][type]}`)}
      onClick={this.change.bind(this)}
    >
      {text}
    </div>)
  }
}

export default Input