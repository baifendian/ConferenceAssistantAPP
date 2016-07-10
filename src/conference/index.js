/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule conference/index.js
 */

import React, { Component } from 'react'
import { NavigatorIOS } from 'react-native'
import Home from './Home'
import NewConference from './NewConference'

class Conference extends Component {

  handleNewConference() {
    this.refs.nav.push({
      title: '发起会议',
      component: NewConference,
      rightButtonTitle: '确定',
      onRightButtonPress: () => {
        this.pushedComponent.save(() => {
          this.home.update()
          this.refs.nav.pop()
        })
      },
      passProps: {
        ref: component => {
          this.pushedComponent = component
        },
      }
    })
  }

  render() {
    return (
      <NavigatorIOS 
        ref="nav"
        style={{flex: 1}}
        barTintColor="#2196f3"
        titleTextColor="#fff"
        tintColor="#fff"
        initialRoute={{
          title: '会议',
          component: Home,
          rightButtonTitle: '添加',
          onRightButtonPress: this.handleNewConference.bind(this),
          passProps: {
            ref: component => {
              this.home = component
            },
          }
        }}
        translucent={false}
      />
    )
  }
}

export default Conference
