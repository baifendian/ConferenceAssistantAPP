/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Tabbar.js
 */

import React, { Component } from 'react'
import { TabBarIOS } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Conference from './conference'
import Contacts from './contacts'
import Todos from './todos'
import Mine from './mine'

class Tabbar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'conference'
    }
  }

  render() {
    return (
      <TabBarIOS
        style={{height: 150}}
        unselectedTintColor="#666"
        tintColor="#0e78e7"
        barTintColor="#eee"
      >
        <Icon.TabBarItemIOS
          title="会议"
          iconName="commenting-o"
          iconSize={20}
          selected={this.state.selectedTab === 'conference'}
          onPress={() => {
            this.setState({
              selectedTab: 'conference'
            })
          }}
        >
          <Conference />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="通讯录"
          iconName="users"
          iconSize={20}
          selected={this.state.selectedTab === 'contacts'}
          onPress={() => {
            this.setState({
              selectedTab: 'contacts'
            })
          }}>
          <Contacts />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="待办"
          badge={2}
          iconName="history"
          iconSize={20}
          selected={this.state.selectedTab === 'todos'}
          onPress={() => {
            this.setState({
              selectedTab: 'todos'
            })
          }}>
          <Todos />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="我"
          iconName="user"
          iconSize={20}
          selected={this.state.selectedTab === 'mine'}
          onPress={() => {
            this.setState({
              selectedTab: 'mine'
            })
          }}>
          <Mine />
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    )
  }
}

export default Tabbar