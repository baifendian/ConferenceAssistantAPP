/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule todos/index.js
 */

import React, { Component } from 'react'
import { NavigatorIOS } from 'react-native'
import Home from './Home'

class Todos extends Component {
  render() {
    return (
      <NavigatorIOS 
        ref="nav"
        style={{flex: 1}}
        barTintColor="#2196f3"
        titleTextColor="#fff"
        tintColor="#fff"
        initialRoute={{
          title: '待办',
          component: Home,
          passProps: {
            url: 'queryTodolist.do?uid=' + global.user.uid
          }
        }}
        translucent={false}
      />
    )
  }
}

export default Todos