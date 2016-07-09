import React, { Component } from 'react'
import { Text, View } from 'react-native'
import List from '../List'
import UserView from './UserView'

class Home extends Component {

  renderItem(item) {
    return <UserView {...item} />
  }

  render() {
    return (
      <List 
        url="user/getAllUser"
        render={this.renderItem}
        searchCol="email"
      />
    )
  }
}

export default Home