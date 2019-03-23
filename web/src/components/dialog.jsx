import Transition from './transition'
import React from 'react'
import Component from '@/Component'


const dialogQueue = [] // dialog队列
let dialogState = false // 是否有dialog在执行中

class Dialog extends Component {
  constructor(props) {
    super(props)

    this.inQueue = false

    this.state = {
      Comp: null,
      props: null
    }
  }

  componentDidMount() {
    this.on('dialog.open', (Comp, props) => {
      dialogQueue.push({ Comp, props })
      if (!dialogState) {
        dialogState = true
        this.openDialog()
      }
    })
  }

  componentWillUnmount() {
    this.off('dialog.open')
  }

  openDialog() {
    if (dialogQueue.length) {
      dialogState = true
      const dialogItem = dialogQueue.shift()
      const { Comp, props } = dialogItem
      this.setState({ Comp, props }, () => {
        this.toggleBodyClass(true)
      })
    }
  }

  toggleBodyClass(state, fn) {
    const $body = document.getElementsByTagName('body')[0]
    if (state) {
      $body.className += ' c-dialog'
    } else {
      setTimeout(() => {
        $body.className = ''
        dialogState = false
        typeof fn === 'function' && fn()
        this.openDialog()
      }, 300)
    }
  }

  closeDialog(fn) {
    this.setState({
      Comp: null
    }, () => {
      this.toggleBodyClass(false, fn)
    })
  }

  render() {
    const { Comp, props } = this.state

    return (
      <Transition name="scaleOut">
        {Comp ? <div className="c-dialog">
          <Comp {...props} close={this.closeDialog.bind(this)} />
        </div> : null}
      </Transition>
    )
  }
}

export default Dialog
