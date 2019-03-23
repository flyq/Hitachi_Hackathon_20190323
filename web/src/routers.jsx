import { Switch, Route, withRouter} from 'react-router'
import React, { Component }  from 'react'
import { connect } from 'react-redux'
import App from './App'
import Home from '@/pages/home'
import Header from '@/pages/home/modules/header'
import List from '@/pages/list'
import Create from '@/pages/create'
import Register from '@/pages/register'
import Partake from '@/pages/partake'
import Release from '@/pages/release'


class Router extends Component {
  state = {
    pathname: this.props.router
  }

  componentWillMount () {
    console.log(this.state.pathname)
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.router) !== JSON.stringify(this.state.pathname)) {
      this.setState({ pathname: nextProps.router })
    }
  }

  render() {
    const { pathname } = this.state
    return (<App>
      <div>
        <div>
          <Header pathname={pathname} />
        </div>}
      </div>
      <Switch>
        <Route exact path="/release" component={Release} />
        <Route exact path="/partake" component={Partake} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/list" component={List} />
        <Route exact path="/" component={Home} />
      </Switch>
    </App>)
  }
}

export default withRouter(connect(state => ({
  router: state.router.location.pathname
}), null)(Router))