import React from 'react'
import Component from '@/Component'
import classs from 'classnames'
import styles from './partake.scss'

class Partake extends Component {
  state = {
    list: [{
      name: '亚马逊自动理赔',
      doc: '帮助亚马逊卖家自动分析店铺,实现智能申请理赔',
      email: 'xiaomingtongxue@io.com',
      pic: '10 ETH',
      type: 0
    }, {
      name: '亚马逊自动理赔',
      doc: '帮助亚马逊卖家自动分析店铺,实现智能申请理赔',
      email: 'xiaomingtongxue@io.com',
      pic: '10 ETH',
      type: 1
    }, {
      name: '亚马逊自动理赔',
      doc: '帮助亚马逊卖家自动分析店铺,实现智能申请理赔',
      email: 'xiaomingtongxue@io.com',
      pic: '10 ETH',
      type: 0
    }, {
      name: '亚马逊自动理赔',
      doc: '帮助亚马逊卖家自动分析店铺,实现智能申请理赔',
      email: 'xiaomingtongxue@io.com',
      pic: '10 ETH',
      type: 0
    }, {
      name: '亚马逊自动理赔',
      doc: '帮助亚马逊卖家自动分析店铺,实现智能申请理赔',
      email: 'xiaomingtongxue@io.com',
      pic: '10 ETH',
      type: 1
    }]
  }

  render() {
    const { list } = this.state
    return (
      <div className={styles.list}>
        <div className={styles.body}>
          <div className={styles.listTitle}>
            <span>项目名</span>
            <span>项目介绍</span>
            <span>发布人邮箱</span>
            <span>项目价格</span>
          </div>
          {list.map((item, index) => (
            <div key={index} className={styles.listItem}>
              <div>{item.name}</div>
              <div>{item.doc}</div>
              <div>{item.email}</div>
              <div>{item.pic}</div>
              <div>
                {!item.type && <span className={styles.success}>确认完成</span>}
                {!!item.type && <span className={styles.end}>已完成</span>}
                {!!item.type && <span className={styles.link}>申请仲裁</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Partake