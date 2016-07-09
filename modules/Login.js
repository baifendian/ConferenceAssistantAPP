import React, { Component } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import Form from './Form'

const style = {
  container: {
    paddingTop: 150,
    backgroundColor: '#fafafa'
  },
  header: {
    marginBottom: 30,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    textAlign: 'right',
    fontSize: 30
  },
  subTitle: {
    textAlign: 'right',
    color: '#999',
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
  }
}

class Login extends Component {

  constructor() {
    super()
    this.items = [{
      name: 'username',
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
      email(v) {
        if (!v) return '请输入邮箱'
      },
      password(v) {
        if (!v) return '请输入密码'
      }
    }
    this.state = {}
  }

  handleSubmit() {
    this.refs.form.save(data => {
      this.props.onLogin()
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
          url={'createTodolist.do'}
          items={this.items} 
          rules={this.rules}
          data={this.state} 
        />
        <TouchableHighlight underlayColor="#42a5f5" onPress={this.handleSubmit.bind(this)} style={style.submit}>
          <Text style={style.submitText}>登录</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default Login