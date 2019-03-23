import React from 'react'
import Component from '@/Component'
import classs from 'classnames'
import styles from './create.scss'

class Create extends Component {
  state = {
    name: '',
    doc: '',
    pic: '',
    email: '',
    time: ''
  }

  change (name, e) {
    this.setState({
      [name]: e.target.value
    })
  }

  render() {
    const { list } = this.state
    return (
      <div className={styles.create}>
        <div className={styles.body}>
          <div className={styles.box}>
            <div className={styles.input}>
              <img src="/1.png" alt="" />
              <span>项目名称</span>
              <input 
                onChange={this.change.bind(this, 'name')}
                value={this.state.name}
              />
            </div>
            <div className={styles.input}>
              <img src="/2.png" alt="" />
              <span>项目介绍</span>
              <input
                onChange={this.change.bind(this, 'doc')}
                value={this.state.doc}
              />
            </div>
            <div className={styles.input}>
              <img src="/3.png" alt="" />
              <span>项目出价</span>
              <input
                onChange={this.change.bind(this, 'pic')}
                value={this.state.pic}
              />
              <b>ETH</b>
            </div>
            <div className={styles.input}>
              <img src="/4.png" alt="" />
              <span>联系邮箱</span>
              <input
                onChange={this.change.bind(this, 'email')}
                value={this.state.email}
              />
            </div>
            <div className={styles.input}>
              <img src="/5.png" alt="" />
              <span>项目完成天数</span>
              <input
                onChange={this.change.bind(this, 'time')}
                value={this.state.time}
              />
            </div>
            <div className={styles.btnBo}>
              <div className={styles.btn}>确认发布</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Create