/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Datepicker.js
 */

import React, { Component, PropTypes } from 'react'
import { View, Text, DatePickerIOS } from 'react-native'

class Datepicker extends Component {

  constructor(props) {
    super(props)
    this.state = {
      date: props.date || new Date()
    }
  }

  componentWillReceiveProps(nextProps) {
    'date' in nextProps && this.setState({date: nextProps.date})   
  }

  handleChange(date) {
    this.setState({ date })
    this.props.onChange && this.props.onChange(date)
  }

  render() {
    const { date, onChange, ...other } = this.props
    return (
      <DatePickerIOS 
        date={this.state.date} 
        onDateChange={this.handleChange.bind(this)}
        {...other}
      />
    )
  }
}

Datepicker.propTypes = {
  date: PropTypes.instanceOf(Date),
  onChange: PropTypes.func
}

export default Datepicker