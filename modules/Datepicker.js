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