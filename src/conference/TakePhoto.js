/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule conference/TakePhoto.js
 */

import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native'
import Camera from 'react-native-camera'

const style = {
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  }
}


class TakePhoto extends Component {
  render() {
    return (
      <Camera
        ref="camera"
        style={style.preview}
        aspect={Camera.constants.Aspect.fill}>
      </Camera>
    )
  }
}

export default TakePhoto