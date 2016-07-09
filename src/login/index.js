/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule login/index.js
 */

import React, { Component } from 'react'
import { NavigatorIOS } from 'react-native'
import Home from './Home'

class Login extends Component {
  render() {
    return (
      <NavigatorIOS 
        style={{flex: 1}}
        barTintColor="#2196f3"
        titleTextColor="#fff"
        tintColor="#fff"
        initialRoute={{
          title: '登录',
          component: Home,
          passProps: {
            onLogin: data => {
              this.props.onLogin(data)
            }
          }
        }}
        translucent={false}
      />
    )
  }
}

export default Login