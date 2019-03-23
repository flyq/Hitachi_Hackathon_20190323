import React from 'react'
import Component from '@/Component'
import classs from 'classnames'
import { buyItem } from 'send.js'
import styles from './register.scss'

class Register extends Component {
  state = {
    skilful: ''
  }
  
  change (e) {
    this.setState({ skilful: e.target.value })
  }

  btn () {
    // console.log(buyItem)
    buyItem(2, 1000000000000000000).then(resp => {
      console.log(resp, 'success');
    }).catch(e => {
      console.log(e, 'error');
    })
  }

  render() {
    return (
      <div className={styles.register}>
        <div className={styles.body}>
          <div className={styles.box}>
            <img src="/7.png" alt="" />
            <p>擅长编程语言</p>
            <div className={styles.input}>
              <input onChange={this.change.bind(this)} type="text" value={this.state.skilful} />
            </div>
            <div onClick={this.btn.bind(this)} className={styles.btn}>确认注册</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register