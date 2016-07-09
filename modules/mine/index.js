import React, { Component } from 'react'
import { NavigatorIOS } from 'react-native'
import Home from './Home'

class Mine extends Component {
  render() {
    return (
      <NavigatorIOS 
        ref="nav"
        style={{flex: 1}}
        barTintColor="#2196f3"
        titleTextColor="#fff"
        tintColor="#fff"
        initialRoute={{
          title: '我',
          component: Home
        }}
        translucent={false}
      />
    )
  }
}

export default Mine