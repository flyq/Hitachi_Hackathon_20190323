import React from 'react'
import Component from '@/Component'
import classs from 'classnames'
import Input from '@/components/input'
import Select from '@/components/select'
import Button from '@/components/button'
import { func } from 'prop-types'
import styles from './addPayMethod.scss'

class AddPayMethod extends Component {
  static propTypes = {
    close: func.isRequired
  }
  state = {
    status: 0 // 0信用卡 1 paypal
  }

  changeType(status) {
    this.setState({ status })
  }

  changeValue(name, value) {
    // 所有的输入框
    this.setState({ [name]: value })
  }

  changeBtn(name) {
    // status 0信用卡 1 paypal
    if (name === "close") {
      this.props.close()
      return false
    }
    if (this.state.status) {
      if (this.state.paypal) {
        this.ajax.post('/user/paypal', {
          mail: this.state.paypal
        }).then(resp => {
          console.log(resp.data.data)
          if (resp.data.data === 1) {
            alert('添加PAYPAL成功')
          }
        })
      }
    } else {
      const { code, crad, month, name, year } = this.state
      if (code && crad && month && name && year) {
        this.ajax.post('/user/credit_card', {
          number: +crad,
          code: +code,
          expire_year: year,
          expire_month: +month,
          name
        }).then(resp => {
          if (resp.data.data === 1) {
            alert('添加信用卡成功')
          }
        })
      }
    }
  }

  changeSelect(name, value) {
    // 搜索的下拉框选择
    this.setState({ [name]: value })
  }

  getYear() {
    const date = new Date;
    const year = date.getFullYear()
    return [...Array(30)].map((item, index) => index + year)
  }

  render() {
    const { status } = this.state
    return (
      <div className={styles.body}>
        <div className={styles.title}>
          <span>添加支付方式</span>
          <i className="icon icon-close" onClick={this.props.close} />
        </div>
        <div className={styles.type}>
          <i onClick={this.changeType.bind(this, 0)} className={classs(!status && styles.activeType)} />
          <span className={styles.id}>添加信用卡</span>
          <i onClick={this.changeType.bind(this, 1)} className={classs(status && styles.activeType)} />
          <span className={styles.paypal}>添加PAYPAL</span>
        </div>
        {!status && <div className={styles.contant}>
          <div className={styles.item}>
            <p>持卡人姓名(拼音全大写)</p>
            <div className={styles.input}>
              <Input
                name="name"
                change={this.changeValue.bind(this)}
              />
            </div>
          </div>
          <div className={styles.item}>
            <p>信用卡号</p>
            <div className={styles.input}>
              <Input
                name="crad"
                change={this.changeValue.bind(this)}
              />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.select}>
              <Select
                list={this.getYear()}
                change={this.changeSelect.bind(this)}
                name="year"
              />
            </div>
            <span className={classs(styles.labals)}>年</span>
            <div className={styles.select}>
              <Select
                list={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']}
                change={this.changeSelect.bind(this)}
                name="month"
              />
            </div>
            <span className={styles.labal}>月</span>
          </div>
          <div className={styles.item}>
            <p>卡验证码(信用卡背后的卡验证码,3位数字)</p>
            <div className={styles.input}>
              <Input
                name="code"
                change={this.changeValue.bind(this)}
              />
            </div>
          </div>
        </div>}
        {!!status && <div className={styles.item}>
          <p>PAYPAL邮箱</p>
          <div className={styles.input}>
            <Input
              name="paypal"
              change={this.changeValue.bind(this)}
            />
          </div>
        </div>}
        <div className={styles.btn}>
          <div className={styles.btnItem}>
            <Button text="保存" name="btn" change={this.changeBtn.bind(this)} />
          </div>
          <div className={styles.btnItem}>
            <Button type={1} text="取消" name="close" change={this.changeBtn.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}

export default AddPayMethod
