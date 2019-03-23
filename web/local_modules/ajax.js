/* eslint-disable */


import axios from 'axios'
// import config from 'config'
// import Global from 'Global'
// import React from 'react'
import { getLocalStorage, removeLocalStorage } from 'storeUtil'

const instance = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})
// let isLogged = false // 因为资产是轮训拿的。设置一个变量，如果isLogged===true则停止拿资产
// instance.defaults.withCredentials = true
// instance.defaults.headers.post['Content-Type'] = 'application/json'

// Global.on('loggedIn.ajax', () => {
//   isLogged = false
// })

instance.interceptors.request.use(config => {
  config.url = process.env.NODE_ENV !== 'development' ? '/api/v1' + config.url : config.url;
  config.headers.common = {
    'token': getLocalStorage('token')
  };
  return config;
}, error => {
  return Promise.reject(error);
})


instance.interceptors.response.use(response => {
  if (response.status >= 300 || !response.data) {
    return Promise.reject(response)
  }
  // if (response.data.status === 1007) {
  //   !isLogged && Global.emit('logged', isLogged)
  //   isLogged = true
  //   return Promise.reject(response.data);
  // }
  return response;
}, (error) => {
  console.log('这里弹窗需要做 错误处理')

  return Promise.reject(error)
})

export default instance
