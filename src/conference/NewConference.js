/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule conference/NewConference.js
 */

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Form from '../Form'
import UserView from '../contacts/UserView'

class NewConference extends Component {

  constructor() {
    super()
    this.items = [{
      name: 'title',
      label: '主题',
      type: 'input'
    }, {
      name: 'addr',
      label: '地点',
      type: 'input'
    }, {
      name: 'st',
      label: '开始时间',
      type: 'date',
      passProps: {
        minuteInterval: 30
      }
    }, {
      name: 'et',
      label: '结束时间',
      type: 'date',
      passProps: {
        minuteInterval: 30
      }
    }, {
      name: 'plist',
      label: '邀请',
      type: 'select',
      labelCol: 'name',
      passProps: {
        url: 'user/getAllUser',
        uniqueCol: 'name',
        searchCol: 'email',
        multiple: true,
        render: item => <UserView {...item} />
      }
    }, {
      name: 'content',
      label: '内容',
      type: 'input'
    }, {
      name: 'mtype',
      label: '重复',
      type: 'select',
      labelCol: 'cycle',
      passProps: {
        data: [{
          mtid: 0,
          cycle: '临时会议' 
        }, {
          mtid: 1,
          cycle: '周例会' 
        }, {
          mtid: 2,
          cycle: '月例会' 
        }],
        uniqueCol: 'mtid',
        labelCol: 'cycle'
      }
    }]
    this.rules = {
      plist(v) {
        if (!v) return '请选择被邀请人'
      },
      mtype(v) {
        if (!v) return '请选择重复类型'
      }
    }
    this.state = {
      st: +global.now,
      et: +global.now
    }
  }

  save(callback) {
    const form = this.refs.form
    form.save(callback, {
      meeting: {
        user: global.user,
        ...form.state.data
      }
    })
  }

  render() {
    return (
      <Form 
        ref="form"
        url="createMeeting.do"
        navigator={this.props.navigator} 
        items={this.items} 
        rules={this.rules}
        data={this.state} 
      />
    )
  }
}

export default NewConference