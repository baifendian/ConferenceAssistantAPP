import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const style = {
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    marginLeft: 10
  },
  email: {
    flex: 1,
    textAlign: 'right',
    color: '#aaa'
  }
}

function UserView(props) {
  return (
    <View style={style.container}>
      <Icon name="user" color="#666" />
      <Text style={style.name}>{props.name}</Text>
      <Text style={style.email}>{props.email}</Text>
    </View>
  )
}

export default UserView