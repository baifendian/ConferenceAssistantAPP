import React, { Component } from 'react'
import { Text, View, TextInput, TouchableHighlight, AlertIOS } from 'react-native'
import format from 'dateformat'
import Term from '../Term'
import Todos from '../Todos'
import NewTodo from './NewTodo'
import Chat from './Chat'
import style from './style/detail'

class Detail extends Component {

  handleTodosPress() {
    this.props.navigator.push({
      title: '待办事项',
      component: Todos,
      rightButtonTitle: '添加',
      onRightButtonPress: this.handleTodosAdd.bind(this),
      passProps: {
        ref: component => {
          this.todos = component
        },
        query: {
          mid: this.props.mid  
        }
      }
    })
  }

  handleTodosAdd() {
    this.props.navigator.push({
      title: '创建待办',
      component: NewTodo,
      passProps: {
        mid: this.props.mid
      },
      rightButtonTitle: '确定',
      onRightButtonPress: () => {
        this.pushedComponent.save(() => {
          this.todos.forceUpdate()
          this.refs.nav.pop()
        })
      }
    })
  }

  handleChatPress() {
    this.props.navigator.push({
      title: '群聊',
      component: Chat,
      passProps: {
        mid: this.props.mid
      }
    })
  }

  render() {
    const props = this.props
    return (
      <View style={style.container}>
        <Term label="主题:">
          <Text>{props.title}</Text>
        </Term>
        <Term>
          <Term.Item label="发起:">
            <Text>{props.user.name}</Text>
          </Term.Item>
          <Term.Divider />
          <Term.Item label="参与:">
            <Text>{props.plist.map(item => item.name).join(', ')}</Text>
          </Term.Item>
          <Term.Divider />
          <Term.Item label="时间:">
            <Text>
              {format(props.st, 'm月d号 HH:MM') + ' 至 ' + format(props.et, 'HH:MM')}
            </Text>
          </Term.Item>
          <Term.Divider />
          <Term.Item label="地点:">
            <Text>{props.addr}</Text>
          </Term.Item>
        </Term>
        <Term label="内容:">
          <Text>{props.content}</Text>
        </Term>
        <Term label="待办事项" onPress={this.handleTodosPress.bind(this)}>
          <Text style={style.termContentRight}>1条</Text>
        </Term>
        <Term label="群聊" onPress={this.handleChatPress.bind(this)}>
          <Text style={style.termContentRight}>打开</Text>
        </Term>
      </View>
    )
  }
}

export default Detail