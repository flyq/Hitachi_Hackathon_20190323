import React from 'react'
import Component from '@/Component'
import classs from 'classnames'
import { number, func } from 'prop-types'

class Pagination extends Component {
  static propTypes = {
    total: number.isRequired,
    change: func.isRequired,
    page: number
  }

  static defaultProps = {
    page: 1
  }

  state = {
    index: 0
  }

  componentDidMount () {
    this.props.change(this.state.index + 1)
    this.on('page.page', () => {
      this.setState({ index: 0 })
    })
  }

  change(num) {
    this.setState({
      index: num
    }, () => {
      this.props.change(num + 1)
    })
  }

  render() {
    const { total } = this.props
    const { index } = this.state
    return (<div className="c-pagination">
      {[...Array(total)].map((item, i) => (
        <div 
          key={i}
          className={classs(i === index && 'c-pagination-active')}
          onClick={this.change.bind(this, i)}
        >{i + 1}</div>
      ))}
    </div>)
  }
}

export default Pagination