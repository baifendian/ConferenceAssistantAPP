/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule contacts/Home.js
 */

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