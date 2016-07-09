import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native'
import Message from 'react-native-gifted-messenger'

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [
        {
          text: '轻举、金伟，今晚 dota 开黑啊?',
          name: 'React-Bot',
          image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
          position: 'left',
          date: new Date(2016, 3, 14, 13, 0),
          uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
        },
        {
          text: "Yes, and I use Gifted Messenger!",
          name: 'Awesome Developer',
          position: 'right',
          date: new Date(2016, 3, 14, 13, 1),
          uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
        }
      ]
    }
  }

  componentDidMount() {
    this.ws = new WebSocket('ws://10.11.6.170:8080/ca/socket')
    this.ws.onmessage = e => {
      const message = JSON.parse(e.data)
      console.log(message)
      const messages = this.state.messages
      this.setState({messages: messages.concat(message)})
    }
  }

  handleSend(message) {
    message.mid = this.props.mid
    message.uniqueId = Math.random()
    this.ws.send(JSON.stringify(message))
  }

  render() {
    return (
      <Message 
        maxHeight={Dimensions.get('window').height - 120}
        senderName={global.user.name}
        handleSend={this.handleSend.bind(this)}
        messages={this.state.messages}
      />
    )
  }
}

export default Home