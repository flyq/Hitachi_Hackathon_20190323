import { Component } from 'react'
import ajax from 'ajax'
import Global from 'Global'

class IOComponent extends Component {
  constructor() {
    super()
    this.ajax = ajax
  }

  emit (...rest) {
    Global.emit(...rest)
  }

  on (...rest) {
    Global.on(...rest)
  }

  off (...rest) {
    Global.off(...rest)
  }

  openDialog (...rest) {
    this.emit('dialog', ...rest)
  }

  url (api, data) {
    let url = ''
    for (let key in data) {
      if (url.indexOf('?') > -1) {
        url += `${'&' + key}=${data[key]}`
      } else {
        url += `?${key}=${data[key]}`
      }
    }
    return api + url
  }
}

export default IOComponent
