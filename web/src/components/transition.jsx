import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import PropTypes, { element, string, any } from 'prop-types'

class Transition extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([any, element]),
    name: string.isRequired
  }

  static defaultProps = {
    children: null
  }

  render() {
    const { children, name, ...other } = this.props

    return (<ReactCSSTransitionGroup
      transitionName={name}
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
      transitionAppearTimeout={300}
      {...other}
    >
      {children}
    </ReactCSSTransitionGroup>)
  }
}

export default Transition