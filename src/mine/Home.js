/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule mine/Home.js
 */

import React, { Component } from 'react'
import { Text, View, TouchableHighlight, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Conference from '../conference/Home'
import Todos from '../todos/Home'

const style = {
  base: {
    flexDirection: 'row',
    padding: 20
  },
  baseInfo: {
    marginLeft: 15
  },
  name: {
    fontSize: 20,
    marginBottom: 10
  },
  assist: {
    color: '#aaa',
    fontSize: 12
  },
  record: {
    marginTop: 20,
    flexDirection: 'row',
    borderColor: '#ccc',
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  recordItem: {
    flex: 1,
    padding: 20,
    borderColor: '#ccc',
    borderLeftWidth: 1
  },
  recordItemFirst: {
    borderLeftWidth: 0
  },
  recordTitle: {
    color: '#666',
    marginBottom: 5
  },
  recordCount: {
    color: '#2196f3',
    fontWeight: 'bold'
  },
  logout: {
    margin: 10,
    marginTop: 300,
    padding: 10,
    backgroundColor: '#FF1717',
    borderRadius: 4
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center'
  }
}

class Home extends Component {

  handleConferencePress(type) {
    this.props.navigator.push({
      title: type === 'own' ? '我发起的会议' : '我参与的会议',
      component: Conference,
      passProps: {
        owner: type
      }
    })
  }

  handleTodosPress() {
    this.props.navigator.push({
      title: '我的待办事项',
      component: Todos
    })
  }

  handleLogout() {
    AsyncStorage.removeItem('user', () => {
      global.app.logout()
    })
  }

  render() {
    return (
      <View>
        <View style={style.base}>
          <Icon name="picture-o" size={40} color="#aaa" />
          <View style={style.baseInfo}>
            <Text style={style.name}>{global.user.name}</Text>
            <Text style={style.assist}>邮箱：{global.user.email}</Text>
          </View>
        </View>
        <View style={style.record}>
          <TouchableHighlight 
            style={[style.recordItem, style.recordItemFirst]}
            onPress={this.handleConferencePress.bind(this, 'own')}
            underlayColor="#ccc"
          >
            <View>
              <Text style={style.recordTitle}>我发起</Text>
              <Text style={style.recordCount}>3</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight 
            style={style.recordItem}
            onPress={this.handleConferencePress.bind(this, 'in')}
            underlayColor="#ccc"
          >
            <View>
              <Text style={style.recordTitle}>我参与</Text>
              <Text style={style.recordCount}>15</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight 
            style={style.recordItem}
            onPress={this.handleTodosPress.bind(this)}
            underlayColor="#ccc"
          >
            <View>
              <Text style={style.recordTitle}>待办</Text>
              <Text style={style.recordCount}>2</Text>
            </View>
          </TouchableHighlight>
        </View>
        <TouchableHighlight underlayColor="#D81414" onPress={this.handleLogout.bind(this)} style={style.logout}>
          <Text style={style.logoutText}>退出</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default Home