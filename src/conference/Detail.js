/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule conference/Detail.js
 */

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import format from 'dateformat'
import Term from '../Term'
import Todos from '../Todos'
import NewTodo from './NewTodo'
import Chat from './Chat'
import Photo from './Photo'
import TakePhoto from './TakePhoto'
import xhr from '../xhr'
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
        url: 'queryTodolist.do?mid=' + this.props.mid
      }
    })
  }

  handleTodosAdd() {
    this.props.navigator.push({
      title: '创建待办',
      component: NewTodo,
      passProps: {
        ref: component => {
          this.pushedComponent = component
        },
        mid: this.props.mid
      },
      rightButtonTitle: '确定',
      onRightButtonPress: () => {
        this.pushedComponent.save(() => {
          this.todos.update()
          this.props.navigator.pop()
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

  handleTakePhoto() {
    this.props.navigator.push({
      title: '相机',
      component: TakePhoto,
      rightButtonTitle: '确定',
      onRightButtonPress: this.handlePhotoOk.bind(this),
      passProps: {
        ref: component => {
          component && (this.camera = component.refs.camera)
        }
      }
    })
  }

  handlePhotoOk() {
    this.camera.capture()
      .then((data) => {
        this.uploadPhoto(data.path)
      })
  }

  uploadPhoto(path) {
    const formData = new FormData()
    formData.append('file', {
      uri: path,
      name: 'test.jpg',
      // type: 'image/jpeg'
      type: 'application/octet-stream'
    })
    xhr({
      url: 'upload1.do',
      type: 'POST',
      data: formData
    })
  }

  handlePhotoPress() {
    this.props.navigator.push({
      title: '照片墙',
      component: Photo,
      rightButtonTitle: '拍照',
      onRightButtonPress: this.handleTakePhoto.bind(this)
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
        <Term label="照片墙" onPress={this.handlePhotoPress.bind(this)}>
          <Text style={style.termContentRight}>打开</Text>
        </Term>
        <Term label="待办事项" onPress={this.handleTodosPress.bind(this)}>
          <Text style={style.termContentRight}>打开</Text>
        </Term>
        <Term label="群聊" onPress={this.handleChatPress.bind(this)}>
          <Text style={style.termContentRight}>打开</Text>
        </Term>
      </View>
    )
  }
}

export default Detail