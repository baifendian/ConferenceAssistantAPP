/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule conference/Photo.js
 */

import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import Fetch from '../Fetch'

const style = {
  empty: {
    flex: 1,
    textAlign: 'center',
    padding: 40,
    color: '#999'
  }
}

class Photo extends Component {

  render() {
    const { data } = this.props
    return (
      <View>
        {data && data.length ? data.map((item, i) => {
          <Image key={i} source={{uri: item.url}} />
        }) : <Text style={style.empty}>暂无照片记录</Text>}
      </View>
    )
  }
}

export default Photo