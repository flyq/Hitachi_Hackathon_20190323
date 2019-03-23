import React from 'react'
import Component from '@/Component'
import { func, number } from 'prop-types'
import styles from './invoiceDetails.scss'

class InvoiceDetails extends Component {
  static propTypes = {
    close: func.isRequired,
    id: number.isRequired
  }

  state = {
    page: 1,
    list: []
  }

  componentWillMount () {
    this.ajax.get(this.url('/refund/invoice/details', {
      refund_invoice_id: this.props.id,
      start: this.state.page,
      limit: 20
    })).then(resp => {
      this.setState({ list: resp.data.data})
    })
  }

  render() {
    const { list } = this.state
    return (
      <div className={styles.invoice}>
        <div className={styles.title}>退款详情 <i onClick={this.props.close} className="icon icon-close" /></div>
        <div className={styles.listTitle}>
          <span>退款明细ID</span>
          <span>亚马逊退款编号</span>
          <span>退款账户</span>
          <span>退款类型</span>
          <span>退款商品数量</span>
          <span>退款现金</span>
          <span>退款总价</span>
          <span>货币</span>
        </div>
        <div className={styles.body}>
          {!!list.length && list.map((item, i) => (
            <div className={styles.item} key={i}>
              <span>{item.refund_invoice_id}</span>
              <span>{item.refund_code}</span>
              <span>{item.refund_account}</span>
              <span>{item.refund_type}</span>
              <span>{item.refund_product_count}</span>
              <span>{item.refund_cash}</span>
              <span>{item.refund_amount}</span>
              <span>{item.currency}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default InvoiceDetails
