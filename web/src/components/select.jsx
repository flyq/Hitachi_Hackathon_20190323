import React from 'react'
import Component from '@/Component'
import classs from 'classnames'
import { string, func, arrayOf, any } from 'prop-types'

class Select extends Component {
  static propTypes = {
    name: string.isRequired,
    change: func.isRequired,
    labal: string,
    list: arrayOf(any).isRequired
  }

  static defaultProps = {
    labal: null
  }

  state = {
    isOpen: false,
    value: null,
    height: '0px'
  }

  componentDidMount () {
    const { list } = this.props
    if (!list.length) {
      this.setState({  height: '10px' })
    } else {
      this.setState({ height: list.length < 5 ? `${40 * list.length}px` : `${40 * 4.5}px` })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list.length !== this.props.list.length) {
      const { list } = nextProps
      console.log(list.length, 'nextProps')
      if (!list.length) {
        this.setState({ height: '10px' })
      } else {
        this.setState({ height: list.length < 5 ? `${40 * list.length}px` : `${40 * 4.5}px` })
      }
    }
  }

  change(item) {
    this.setState({ value: item, isOpen: false })
    this.props.change(this.props.name, item)
  }

  taggle() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const { list, labal } = this.props
    const { value, isOpen, height } = this.state
    
    return (
      <div className={classs('c-select-wrap')}>
        <div className="c-select-labal" onClick={this.taggle.bind(this)}>{value ? (labal ? value[labal] : value) : '请选择'}</div>
        <i 
          onClick={this.taggle.bind(this)} 
          className={classs('icon icon-openselect', isOpen && 'c-open')}
        />
        {isOpen && <div className="c-select-list" style={{ height }}>
          {list.map((item, index) => (
            <div
              key={index}
              onClick={this.change.bind(this, item)}
              className="c-select-item"
            >
              {labal ? item[labal] : item}
            </div>
          ))}
        </div>}
      </div>
    )
  }
}

export default Select