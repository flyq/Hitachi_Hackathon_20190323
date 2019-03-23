import React from 'react'
import Component from '@/Component'
import { func } from 'prop-types'
import classs from 'classnames'
import styles from './chatRecord.scss'

class ChatRecord extends Component {
  static propTypes = {
    close: func.isRequired
  }

  state = {
    value: "",
    message: [{
      content: "wwx",
      created_at: "2019-02-03 00:00:00",
      from: "11@t.com",
      id: 1,
      to: "xx@amazon.com", // to包含mazon.com就是客服
    }, {
      content: "wwx wwx收到发送到发送到发送到发送到史蒂夫史蒂夫史蒂夫收到发史蒂夫wwxwwxww史蒂夫史蒂夫史蒂夫史蒂夫史蒂夫史蒂夫xwwxwwxwwxwwxwwxwwx",
      created_at: "2019-02-03 00:00:00",
      from: "11@t.com",
      id: 1,
      to: "xx@123132.com",
    }, {
      content: "wwx",
      created_at: "2019-02-03 00:00:00",
      from: "11@t.com",
      id: 1,
      to: "xx@123123.com",
    }, {
      content: "wwx",
      created_at: "2019-02-03 00:00:00",
      from: "11@t.com",
      id: 1,
      to: "xx@123123.com",
    }]
  }

  isOpen (i) {
    const { message } = this.state
    message[i].type = !message[i].type
    this.setState({ message })
  }

  render() {
    // const { message } = this.props
    const { message } = this.state
    return (
      <div className={styles.record}>
        <div className={styles.title}>
          沟通记录 <i className="icon icon-close" onClick={this.props.close} />
        </div>
        <ul className={styles.contant}>
          {Array.isArray(message) && message.length && message.map((item, i) => (
            <li key={i}>
              <div className={styles.isOpen}>
                <span onClick={this.isOpen.bind(this, i)} className={classs(item.to.includes('amazon.com') ? styles.service : styles.my)}>
                  <i className={classs('icon', item.type ? 'icon-meshide' : 'icon-mesopen')} />
                </span>
                <p className={styles.hr} />
              </div>
              <span className={styles.name}>{item.from}</span>
              <p className={classs(styles.message, !item.type && styles.hide)}>{item.content}</p>
              <i className="icon icon-time" /> <span className={styles.time}>{item.created_at}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default ChatRecord
