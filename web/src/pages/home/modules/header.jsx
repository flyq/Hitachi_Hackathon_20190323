import React from 'react'
import Component from '@/Component'
import { Link } from 'react-router-dom'
import { removeLocalStorage } from 'storeUtil'
import AddPayMethod from '@/dialog/addPayMethod'
import classs from 'classnames'
import styles from './header.scss'

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
    }]
  }

  render() {
    const { pathname } = this.props
    const { nav } = this.state
    return (
      <div className={styles.header}>
        <ul className={styles.nav}>
          {nav.map(item => (
            <Link to={item.url} key={item.url}>
              <li 
                className={classs(pathname === item.url && styles.active)}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }
}

export default Header