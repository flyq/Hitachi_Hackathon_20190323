import React from 'react'
import Component from '@/Component'
import Button from '@/components/button'
import { func, number, string } from 'prop-types'
import Input from '@/components/input'
import styles from './package.scss'

class UpdateWx extends Component {
  static propTypes = {
    close: func.isRequired,
    type: number.isRequired,
    name: string.isRequired
  }



  timer = null

  state = {
    code: '',
    newPhoneType: 0,
    newCode: '',
    phone: '',
    newPhone: '',
    codeTime: '获取验证码'
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  change (name, value) {
    this.setState({ [name]: value })
  }

  getCode() {
    const { codeTime } = this.state
    if (codeTime === '获取验证码') {
      this.setState({
        codeTime: 60
      }, () => {
        this.countDown()
      })
    }
  }

  countDown() {
    this.timer = setTimeout(() => {
      this.setState({
        codeTime: this.state.codeTime - 1
      }, () => {
          if (this.state.codeTime > 0) {
          this.countDown()
        } else {
          clearTimeout(this.timer)
          this.setState({ codeTime: '获取验证码' })
        }
      })
    }, 1000);
  }

  changeBtn(type) {
    if (type === 'submit') {
      // this.ajax
      const { name, type } = this.props
      // this.props.close()
      if (name === 'phone' && type) {
        this.setState({
          newPhoneType: 1
        })
      }
    } else {
      this.props.close()
    }
  }

  close() {
    this.props.close()
  }

  title () {
    const { name, type } = this.props
    if (name === 'phone') {
      return ['绑定手机号', '更换手机号'][type]
    } else if (name === 'wx') {
      return ['绑定微信', '更换微信'][type]
    } else {
      return ['绑定邮箱', '更换邮箱'][type]
    }
  }

  render() {
    const {name, type} = this.props
    return (
      <div className={styles.appeal}>
        <div className={styles.title}>
          <span>{this.title()}</span>
          <i onClick={this.close.bind(this)} className="icon icon-close" />
        </div>
        {!this.state.newPhoneType && <div className={styles.personalitem}>
          <div className={styles.labal}>{(name === 'phone' && type) ? '原手机号' : '手机号码'}</div>
          <div className={styles.input}>
            <Input
              name="phone"
              change={this.change.bind(this)}
            />
          </div>
        </div>}
        {!!this.state.newPhoneType && <div className={styles.personalitem}>
          <div className={styles.labal}>{'新手机号'}</div>
          <div className={styles.input}>
            <Input
              name="newPhone"
              change={this.change.bind(this)}
            />
          </div>
        </div>}
        {!this.state.newPhoneType && <div className={styles.personalitem}>
          <div className={styles.labal}>验证码</div>
          <div className={styles.input}>
            <Input
              name="code"
              change={this.change.bind(this)}
            />
          </div>
          <div onClick={this.getCode.bind(this)} className={styles.codeTime}>{this.state.codeTime}</div>
        </div>}
        {!!this.state.newPhoneType && <div className={styles.personalitem}>
          <div className={styles.labal}>验证码</div>
          <div className={styles.input}>
            <Input
              name="newCode"
              change={this.change.bind(this)}
            />
          </div>
          <div onClick={this.getCode.bind(this)} className={styles.codeTime}>{this.state.codeTime}</div>
        </div>}
        {name !== 'phone' && <div className={styles.personalitem}>
          <div className={styles.labal}>{name === 'wx' ? '微信号' : '邮箱号'}</div>
          <div className={styles.input}>
            <Input
              name={name === 'wx' ? 'wx' : 'email'}
              change={this.change.bind(this)}
            />
          </div>
        </div>}
        <div className={styles.btnWrap}>
          <div className={styles.btn}><Button text="提交" name="submit" change={this.changeBtn.bind(this)} /></div>
          <div className={styles.btn}><Button type={1} text="cancel" name="next" change={this.changeBtn.bind(this)} /></div>
        </div>
      </div>
    )
  }
}

export default UpdateWx
