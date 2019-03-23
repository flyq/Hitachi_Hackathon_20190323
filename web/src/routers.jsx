import { Switch, Route, withRouter } from 'react-router'
import React, { Component }  from 'react'
import { connect } from 'react-redux'
import App from './App'
import Home from '@/pages/home'
import Header from '@/pages/header'


class Router extends Component {
  state = {
    pathname: this.props.router
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.router) !== JSON.stringify(this.state.pathname)) {
      this.setState({ pathname: nextProps.router })
    }
  }

  render() {
    return (<App>
      <div>
        <Header pathname={this.state.pathname} />
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </App>)
  }
}

export default withRouter(connect(state => ({
  router: state.router.location.pathname
}), null)(Router))