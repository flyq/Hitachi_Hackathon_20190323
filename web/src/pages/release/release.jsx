import React from 'react'
import Component from '@/Component'
import classs from 'classnames'
import styles from './release.scss'

class Release extends Component {
  state = {
    list: [{
      name: '亚马逊自动理赔',
      doc: '帮助亚马逊卖家自动分析店铺,实现智能申请理赔',
      pic: '10 ETH',
      type: 0
    }, {
      name: '亚马逊自动理赔',
      doc: '帮助亚马逊卖家自动分析店铺,实现智能申请理赔',
      pic: '10 ETH',
      type: 1
    }, {
      name: '亚马逊自动理赔',
      doc: '帮助亚马逊卖家自动分析店铺,实现智能申请理赔',
      pic: '10 ETH',
      type: 2
    }, {
      name: '亚马逊自动理赔',
      doc: '帮助亚马逊卖家自动分析店铺,实现智能申请理赔',
      pic: '10 ETH',
      type: 3
    }, {
      name: '亚马逊自动理赔',
      doc: '帮助亚马逊卖家自动分析店铺,实现智能申请理赔',
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
            <span>项目价格</span>
          </div>
          {list.map((item, index) => (
            <div key={index} className={styles.listItem}>
              <div>{item.name}</div>
              <div>{item.doc}</div>
              <div>{item.pic}</div>
              <div>
                <span className={[styles.no, styles.yes, styles.end, styles.arbitration][item.type]}>
                  {['未被接收', '已被接收', '已完成', '仲裁中'][item.type]}
                </span>
                {item.type ===2 && <span className={styles.link}>申诉仲裁</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Release