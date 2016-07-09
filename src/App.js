/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule App.js
 */

import React, { Component } from 'react'
import { AsyncStorage, AlertIOS } from 'react-native'
import Tabbar from './Tabbar'
import Login from './login'
import xhr from './xhr'

class App extends Component {

  constructor(props) {
    super(props)
    this.hasGotItem = false
  }

  componentWillMount() {
    
    global.now = new Date()

    const userString = AsyncStorage.getItem('user', (err, result) => {
      this.hasGotItem = true
      result && this.updateUser(JSON.parse(result))
    })

    xhr.baseUrl = global.baseUrl = 'http://10.11.6.170:8080/ca/'
    xhr.header = {}
    if (global.user) {
      xhr.header.token = global.user.token
    }
    xhr.success = (res, option) => {
      switch (res.code) {
        case 200:
          option.success && option.success(res.data)
          break
        case 502:
          global.user = null
          this.forceUpdate()
          break
        default:
          AlertIOS.alert(res.message || 'unknown error')
      }
    }
  }

  updateUser(data) {
    global.user = data
    xhr.header.token = global.user.token
    this.forceUpdate()
  }

  handleLogin(data) {
    AsyncStorage.setItem('user', JSON.stringify(data))
    this.updateUser(data)
  }

  render() {
    if (!this.hasGotItem) return null
    if (!global.user) {
      return <Login onLogin={this.handleLogin.bind(this)} />
    }
    return <Tabbar />
  }
}

export default App