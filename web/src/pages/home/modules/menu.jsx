import React from 'react'
import Component from '@/Component'
// import { func } from 'prop-types'
import { Link } from 'react-router-dom'
import classs from 'classnames'
import styles from './menu.scss'

class Menu extends Component {
  // static propTypes = {
  //   changeMenu: func.isRequired
  // }

  state = {
    index: 0, // [索赔, 授权, 账户, 店铺]
    selectValue: '全部',
    isShowSelect: false,
    storeList: []
  }

  menu = [{
    name: 'FBA索赔',
    icon: 'icon icon-fba',
    url: '/home'
  }, {
    name: '绑定商铺',
    icon: 'icon icon-auth',
    url: '/auth'
  }, {
    name: '账户',
    icon: 'icon icon-account',
    url: '/personal'
  }]

  componentWillMount() {
    this.ajax.get(this.url('/store', {
      start: 1,
      limit: 10000
    })).then(resp => {
      this.setState({ storeList: resp.data.data, storeStorage: resp.data.data })
    })
  }

  changeStore(data) {
    this.setState({ selectValue: data.name, isShowSelect: false })
    this.props.pathname === '/home' && this.emit('menu', { type: 1, id: data.id})
  }

  changeMenu (index) {
    this.setState({ index })
  }

  openSelect (e) {
    console.log(e, 'e')
    this.setState({ isShowSelect: !this.state.isShowSelect })
  }

  search (e) {
    const { storeStorage } = this.state
    this.setState({
      search: e.target.value,
      storeList: !!e.target.value ? storeStorage.filter(item => item.name.includes(e.target.value)) : storeStorage
    })
  }

  render() {
    const { index } = this.state
    const { pathname } = this.props
    console.log(pathname, 'pathname')
    return (
      <div className={styles.menu}>
        <div className={styles.logo}>
          <div><img src="/logo.png" alt="" /></div>
        </div>
        <ul className={styles.menuItem}>
          <li>
            <i onClick={this.openSelect.bind(this)} className="icon icon-store" />
            <p onClick={this.openSelect.bind(this)}>{this.state.selectValue}</p>
            {this.state.isShowSelect && <div onClick={this.openSelect.bind(this)} className={styles.mask}>  
            </div>}
            {this.state.isShowSelect && <div className={styles.store}>
              <div className={styles.search}>
                <input
                  placeholder="输入店铺名称搜索"
                  value={this.state.search}
                  onChange={this.search.bind(this)}
                />
                <i className="icon icon-search" />
              </div>
              <div className={styles.storeList}>
                {this.state.storeList.map((item, i) => (
                  pathname !== '/home' ? <Link onClick={this.changeStore.bind(this, item)} key={i} to={{ pathname: '/home', query: { type: 1, id: item.id } }} >
                    <div className={styles.itemStore}>{item.name}</div>
                  </Link> : <div onClick={this.changeStore.bind(this, item)} key={i} className={styles.itemStore}>{item.name}</div>
                ))}
              </div>
            </div>}
          </li>
          {this.menu.map((item, i) => (
            <Link key={i} to={item.url} >
              <li
                onClick={this.changeMenu.bind(this, i)}
                className={classs(i === index && styles.active)}
              >
                <i className={item.icon} />
                <p>{item.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }
}

export default Menu