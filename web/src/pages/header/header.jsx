
import React from 'react'
import Component from '@/Component'
import styles from './header.scss'
import { Link } from 'react-router-dom'
import classs from 'classnames'

class Header extends Component {
  state = {
    nav: [{
      name: '首页',
      url: '/'
    },{
      name: '项目列表',
      url: '/list'
    }, {
      name: '发布项目',
      url: '/create'
    },{
      name: '注册陪审团',
      url: '/register'
    }, {
      name: '我参与的项目',
        url: '/partake'
    },{
      name: '我发布的项目',
      url: '/release'
    },{
      name: '注册仲裁的项目',
      url: '/arbitration'
    }]
  }

  goLink (item) {
    console.log(item)
  }

  render() {
    const { pathname } = this.props
    const { nav } = this.state
    return (
      <div className={styles.header}>
        <ul className={styles.nav}>
          {nav.map(item => (
            <li 
              key={item.url}
              className={classs(pathname === item.url && styles.active)}
              onClick={this.goLink.bind(this, item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Header
