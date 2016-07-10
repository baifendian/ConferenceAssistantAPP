/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Fetch.js
 */

import React, { Component, PropTypes } from 'react'
import { Text, View } from 'react-native'
import Spinner from 'react-native-spinkit'
import xhr from './xhr'

const style = {
  fetchMask: {
    height: 100, 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
}

class Fetch extends Component {

  constructor(props) {
    super(props)
    this.state = {
      xhr: null,
      msg: null
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.url !== nextProps.url) {
      this.fetch()
      return false
    }
    return true
  }
  
  componentDidMount() {
    this.props.url && this.fetch()
  }

  update() {
    this.fetch()
  }

  fetch() {
    this.lazyFetch()
    setTimeout(() => {
      xhr({
        url: this.props.url,
        complete: () => {
          clearTimeout(this.loadingTimer)
        },
        success: this.handleSuccess.bind(this),
        error: this.handleError.bind(this)
      })
    }, this.props.delay || 0)
  }

  lazyFetch() {
    this.loadingTimer = setTimeout(() => {
      this.setState({xhr: 'loading'})
    }, 100)
  }

  handleSuccess(data) {
    this.setState({xhr: 'success'})
    this.props.onLoad && this.props.onLoad(data)
  }

  handleError(msg) {
    this.setState({xhr: 'error', msg})
  }

  render() {
    const { children, ...other } = this.props
    const fetchMask = (
      <View style={style.fetchMask}>
        {(() => {
          switch(this.state.xhr) {
            case 'loading': return <Spinner type="Wave" color="#cccccc" />
            case 'error': return <Text>{this.state.msg}</Text>
          }
        })()}
      </View>
    )
    return (
      <View {...other}>
        {this.props.url && this.state.xhr !== 'success' ? fetchMask: children}
      </View>
    )
  }
}

Fetch.propTypes = {
  url: PropTypes.string,
  delay: PropTypes.number,
  onLoad: PropTypes.func
}

export default Fetch