import React from 'react'
import Component from '@/Component'
import Button from '@/components/button'
import { func, number } from 'prop-types'
import styles from './appeal.scss'

class Appeal extends Component {
  static propTypes = {
    close: func.isRequired,
    id: number.isRequired
  }

  state = {
    value: ""
  }

  change (e) {
    console.log(e.target.value)
    this.setState({ value: e.target.value })
  }

  changeBtn (type) {
    if (type === 'submit' && this.state.value) {
      // this.ajax
      this.ajax.post('/refund/invoice/appeal', {
        id: this.props.id,
        reason: this.state.value
      }).then(resp => {
        if (resp.data.data === 1) {
          this.props.close()
          alert('申诉已发送')
        }
      })
    } else {
      this.props.close()
    }
  }

  close () {
    this.props.close()
  }

  render() {
    return (
      <div className={styles.appeal}>
        <div className={styles.title}>
          <span>请填写申诉理由</span>
          <i onClick={this.close.bind(this)} className="icon icon-close" />
        </div>
        <textarea 
          name="" 
          onChange={this.change.bind(this)}
          className={styles.textarea}
        />
        <div className={styles.btnWrap}>
          <div className={styles.btn}><Button text="提交" name="submit" change={this.changeBtn.bind(this)} /></div>
          <div className={styles.btn}><Button type={1} text="取消" name="next" change={this.changeBtn.bind(this)} /></div>
        </div>
      </div>
    )
  }
}

export default Appeal
