/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule login/Home.js
 */

import React, { Component } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import Form from '../Form'

const style = {
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 100,
    backgroundColor: '#f1f1f1'
  },
  header: {
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    textAlign: 'right',
    color: '#999',
    fontSize: 30
  },
  subTitle: {
    textAlign: 'right',
    color: '#aaa',
    fontSize: 12,
    marginTop: 5
  },
  submit: {
    margin: 10,
    padding: 10,
    backgroundColor: '#2196f3',
    borderRadius: 4
  },
  submitText: {
    color: '#fff',
    textAlign: 'center'
  },
  copyright: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'right',
    marginRight: 10
  }
}

class Login extends Component {

  constructor() {
    super()
    this.items = [{
      name: 'name',
      label: '用户',
      type: 'input'
    }, {
      name: 'password',
      label: '密码',
      type: 'input',
      passProps: {
        secureTextEntry: true
      }
    }]
    this.rules = {
      name(v) {
        if (!v) return '请输入用户名'
      },
      password(v) {
        if (!v) return '请输入密码'
      }
    }
    this.state = {}
  }

  handleSubmit() {
    this.refs.form.save(data => {
      this.props.onLogin(data)
    })
  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.header}>
          <View>
            <Text style={style.title}>百分点会议助手</Text>
            <Text style={style.subTitle}>beta版</Text>
          </View>
        </View>
        <Form 
          ref="form"
          url="user/login"
          items={this.items} 
          rules={this.rules}
          data={this.state} 
        />
        <TouchableHighlight underlayColor="#42a5f5" onPress={this.handleSubmit.bind(this)} style={style.submit}>
          <Text style={style.submitText}>登录</Text>
        </TouchableHighlight>
        <Text style={style.copyright}>Copyright©2016 Baifendian Corporation</Text>
      </View>
    )
  }
}

export default Login