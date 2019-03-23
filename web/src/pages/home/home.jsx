import { connect } from 'react-redux'
import { login, logout } from '@/actions/account'
import { getLocalStorage, setLocalStorage } from 'storeUtil'
import { FormattedMessage } from 'react-intl'
import React from 'react'
import Component from '@/Component'
import styles from './home.scss'
import classs from 'classnames'

class Home extends Component {

  state = {
    value: getLocalStorage('language'),
    lang: [{
      icon: 'icon-zh',
      value: 'zh-CN'
    }, {
      icon: 'icon-en',
      value: 'en-US'
    }]
  }

  langs(data) {
    // 设置语言
    setLocalStorage('language', data.value)
    this.emit('language')
  }

  render() {
    return (
      <div className={styles.home}>
        <div className={styles.gitcoin}>
          <div className={styles.left}>
            <h3>gitcoin缺点</h3>
            <p>
              全球最大的软件外包服务平台Upwork每
              全球最大的软件外包服务平台Upwork每
              全球最大的软件外包服务平台Upwork每
              全球最大的软件外包服务平台Upwork每
              全球最大的软件外包服务平台Upwork每
              全球最大的软件外包服务平台Upwork每全球最大的软件外包服务平台Upwork每
              全球最大的软件外包服务平台Upwork每
              全球最大的软件外包服务平台Upwork每
              全球最大的软件外包服务平台Upwork每
            </p>
          </div>
          <div className={styles.right}>
            <img src="/gitcion.png" alt="" />
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.my}>
            <div className={styles.left}>
              <img src="/start.png" alt="" />
            </div>
            <div className={styles.right}>
              <h3>我们的功能和优点</h3>
              <p>
                炒币带火了区块链，但区块链真正的潜力却有炒币带火了区块链，但区块链真正的潜力却有炒币带火了区块链，但区块链真正的潜力却有炒币带火了区块链，但区块链真正的潜力却有炒币带火了区块链，但区块链真正的潜力却有炒币带火了区块链，但区块链真正的潜力却有炒币带火了区块链，但区块链真正的潜力却有炒币带火了区块链，但区块链真正的潜力却有炒币带火了区块链，但区块链真正的潜力却有
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home
