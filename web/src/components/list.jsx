import React from 'react'
import Component from '@/Component'
import Transition from './transition'
import classs from 'classnames'
import { any, func, arrayOf, string, bool } from 'prop-types'

class List extends Component {
  static propTypes = {
    list: arrayOf(any).isRequired,
    Item: func.isRequired,
    emptyMsg: string.isRequired,
    claxx: string,
    noClaxx: bool
  }

  static defaultProps = {
    claxx: 'c-list-default',
    noClaxx: false
  }

  render() {
    const { list, Item, emptyMsg, claxx, noClaxx, ...argus } = this.props
    return (<Transition name="select" component="ul" className="c-list-ul">
      {list.length ? list.map((item, index) => (
        Array.isArray(item) ? <li key={index} className={classs(!noClaxx && 'c-list-li', !Array.isArray(item) && claxx)}>
          <Item index={index} data={item} {...argus} />
        </li> : <section key={index} className={classs(!noClaxx && 'c-list-li', !Array.isArray(item) && claxx)}>
          <Item index={index} data={item} {...argus} />
        </section>
      )) : <span className="c-list-empty">{emptyMsg}</span>}
    </Transition>)
  }
}

export default List