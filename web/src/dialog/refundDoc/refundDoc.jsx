import React from 'react'
import Component from '@/Component'
import { func } from 'prop-types'
import styles from './refundDoc.scss'

class RefundDoc extends Component {
  static propTypes = {
    close: func.isRequired
  }

  state = {
    value: ""
  }

  render() {
    return (
      <div className={styles.record}>
        <div className={styles.title}>
          退款详情 <i className="icon icon-close" onClick={this.props.close} />
        </div>
        <div className={styles.header}>
          <span>序号</span>
        </div>
      </div>
    )
  }
}

export default RefundDoc
