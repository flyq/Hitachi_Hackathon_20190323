// @flow
import React from 'react'
import Component from '@/Component'
import Dialog from '@/components/dialog'

class App extends Component {
  render () {
    return <div>
      {this.props.children}
      <Dialog />
    </div>
  }
}

export default App
