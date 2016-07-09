import React, { Component, PropTypes } from 'react'
import { View, Text } from 'react-native'
import update from 'react-addons-update'
import Icon from 'react-native-vector-icons/FontAwesome'
import List from './List'

const style = {
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 10
  }
}

class Select extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: props.value || (props.multiple ? [] : {})
    }
  }

  componentWillReceiveProps(nextProps) {
    nextProps.value && this.setState({value: nextProps.value})
  }

  isEqual(source, target) {
    const uniqueCol = this.props.uniqueCol
    return source[uniqueCol] === target[uniqueCol]
  }

  renderItem(item) {
    const { render, labelCol } = this.props
    const value = this.state.value
    let isChecked
    if (!this.props.multiple) {
      isChecked = this.isEqual(item, value)
    } else {
      isChecked = value.filter(value => this.isEqual(value, item)).length
    }
    return (
      <View style={style.container}>
        <Icon 
          style={style.icon}
          name={isChecked ? 'check-circle' : 'circle-thin'}
          color={isChecked ? '#38bb0e' : '#333'}
          size={20}
        />
        {render ? render(item) : <Text>{item[labelCol]}</Text>}
      </View>
    ) 
  }

  handleItemPress(item) {
    let value = this.state.value
    if (!this.props.multiple) {
      value = this.isEqual(item, value) ? {} : item
    } else {
      let matchIndex
      value.forEach((value, i) => {
        if (this.isEqual(value, item)) {
          matchIndex = i
          return true
        }
      })
      if (!isNaN(matchIndex)) {
        value = update(value, {
          $splice: [[matchIndex, 1]]
        })
      } else {
        value = update(value, {
          $push: [item]
        })
      }
    }
    this.setState({ value })
    this.props.onChange && this.props.onChange(value)
  }

  render() {
    const { data, url, searchCol } = this.props
    return (
      <List
        data={data}
        url={url}
        searchCol={searchCol}
        render={this.renderItem.bind(this)}
        onItemPress={this.handleItemPress.bind(this)}
      />
    )
  }
}

Select.propTypes = {
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  uniqueCol: PropTypes.string,
  searchCol: PropTypes.string,
  data: PropTypes.array,
  url: PropTypes.string,
  render: PropTypes.func,
  labelCol: PropTypes.string
}

export default Select