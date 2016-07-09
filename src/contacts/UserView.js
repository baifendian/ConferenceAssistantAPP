/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule contacts/UserView.js
 */

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