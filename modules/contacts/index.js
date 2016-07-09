import React, { Component } from 'react'
import { NavigatorIOS } from 'react-native'
import Home from './Home'

class Contacts extends Component {
  render() {
    return (
      <NavigatorIOS 
        ref="nav"
        style={{flex: 1}}
        barTintColor="#2196f3"
        titleTextColor="#fff"
        tintColor="#fff"
        initialRoute={{
          title: '通讯录',
          component: Home
        }}
        translucent={false}
      />
    )
  }
}

export default Contacts