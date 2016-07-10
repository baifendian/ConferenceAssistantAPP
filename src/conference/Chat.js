/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule conference/Chat.js
 */

import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native'
import Message from 'react-native-gifted-messenger'

class Chat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [{
        text: '请问开始了吗?',
        name: 'jinwei',
        image: {uri: global.baseUrl + 'static/pic/4.png'},
        position: 'left',
        date: new Date(),
        uniqueId: Math.random()
      }]
    }
  }

  componentDidMount() {
    const mid = this.props.mid
    const uid = global.user.uid
    this.ws = new WebSocket(global.baseUrl.replace(/^http/, 'ws') + 'socket?mid=' + mid + '&uid=' + uid)
    this.ws.onmessage = e => {
      const message = JSON.parse(e.data)
      if (message.uid !== global.user.uid) {
        message.position = 'left'
      }
      const messages = this.state.messages
      this.setState({messages: messages.concat(message)})
    }
  }

  handleSend(message) {
    message.mid = this.props.mid
    message.uid = global.user.uid
    message.uniqueId = Math.random()
    this.ws.send(JSON.stringify(message))
  }

  render() {
    return (
      <Message 
        maxHeight={Dimensions.get('window').height - 120}
        senderName={global.user.name}
        senderImage={{uri: global.baseUrl + 'static/pic/4.png'}}
        handleSend={this.handleSend.bind(this)}
        messages={this.state.messages}
      />
    )
  }
}

export default Chat