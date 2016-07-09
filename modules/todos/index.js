import React, { Component } from 'react'
import { NavigatorIOS } from 'react-native'
import Home from './Home'

class Todos extends Component {
  render() {
    return (
      <NavigatorIOS 
        ref="nav"
        style={{flex: 1}}
        barTintColor="#2196f3"
        titleTextColor="#fff"
        tintColor="#fff"
        initialRoute={{
          title: '待办',
          component: Home,
          passProps: {
            query: {
              uid: global.user.uid
            }
          }
        }}
        translucent={false}
      />
    )
  }
}

export default Todos