/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Todos.js
 */

import React, { Component, PropTypes } from 'react'
import { Text, View } from 'react-native'
import format from 'dateformat'
import List from './List'

const style = {
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  left: {
    flex: 1
  },
  title: {
    marginBottom: 5
  },
  deadline: {
    color: '#999',
    fontSize: 11
  },
  remain: {
    color: '#999',
    marginBottom: 5
  },
  owner: {
    color: '#ccc',
    fontSize: 11
  }
}

class Todos extends Component {

  getStatus(deadline) {
    let diff = new Date(deadline) - global.now
    if (diff > 0) {
      diff = Math.round(diff / 1000 / 3600)
      if (diff < 24) {
        return '还剩' + diff + '小时'
      } else {
        diff = Math.round(diff / 24)
        return '还剩' + diff + '天'
      }
    } else {
      return '已过期'
    }
  }

  renderItem(item) {
    return (
      <View style={style.container}>
        <View style={style.left}>
          <Text style={style.title}>{item.desc}</Text>
          <Text style={style.deadline}>{format(item.et, '截止m月d号h点')}</Text>
        </View>
        <View>
          <Text style={style.remain}>{this.getStatus(item.et)}</Text>
          <Text style={style.owner}>{item.plist.name}</Text>
        </View>
      </View>
    ) 
  }

  render() {
    return (
      <List 
        render={this.renderItem.bind(this)}
        searchCol="title"
        {...this.props}
      />
    )
  }
}

Todos.propTypes = {
  url: PropTypes.string,
  data: PropTypes.array
}

export default Todos