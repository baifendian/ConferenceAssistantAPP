import React, { Component, PropTypes } from 'react'
import { Text, View, TextInput, AlertIOS } from 'react-native'
import format from 'dateformat'
import Term from './Term'
import Datepicker from './Datepicker'
import Select from './Select'
import xhr from './xhr'

const style = {
  form: {
    padding: 10
  },
  formItem: {
    // backgroundColor: '#fff',
    borderBottomWidth: 1, 
    borderColor: '#ccc', 
    // borderRadius: 4, 
    padding: 10,
    marginBottom: 10
  },
  input: {
    flex: 1
  },
  selected: {
    textAlign: 'right',
    color: '#aaa',
    marginRight: 10
  }
}

class Form extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    }
  }

  handleChange(name, value) {
    const data = this.state.data
    data[name] = value
    this.setState({ data })
  }

  handleTypeRender = {
    input: (data, item) => {
      return (
        <TextInput 
          style={style.input}
          value={data[item.name]} 
          onChangeText={this.handleChange.bind(this, item.name)}
          {...item.passProps}
        />
      )
    },
    select: (data, item) => {
      const value = data[item.name]
      let label
      if (item.render) {
        label = item.render(value)
      } else {
        const labelCol = item.labelCol
        let text
        if (item.passProps.multiple) {
          text = (value || []).map(v => v[labelCol]).join(', ')
        } else {
          text = (value || {})[labelCol]
        }
        label = <Text style={style.selected}>{text || '请选择'}</Text>
      }
      return label
    },
    date: (data, item) => {
      const value = data[item.name]
      return <Text>{format(value, 'm月d号 HH:MM')}</Text>
    }
  }

  location(title, component, props, onSure) {
    const navigator = this.props.navigator
    navigator.push({
      title,
      component,
      rightButtonTitle: '确定',
      onRightButtonPress: () => {
        navigator.pop()
        onSure()
      },
      passProps: {
        ref: component => {
          this.pushedComponent = component
        },
        ...props
      }
    })
  }

  handleTypePress = {
    date: (data, item) => {
      const { name, label } = item 
      this.location(label, Datepicker, {
        date: data[name],
        ...item.passProps
      }, () => {
        this.handleChange(name, this.pushedComponent.state.date)
      })
    },
    select: (data, item) => {
      const { name, label } = item 
      this.location(label, Select, {
        value: data[name],
        ...item.passProps
      }, () => {
        this.handleChange(name, this.pushedComponent.state.value)
      })
    }
  }

  validate() {
    const rules = this.props.rules || {}
    const data = this.state.data
    let isValid = true
    for (var k in rules) {
      const message = rules[k](data[k])
      if (message) {
        AlertIOS.alert(message)
        isValid = false
        break
      }
    }
    return isValid
  }

  save(callback, data) {
    if (this.validate()) {
      xhr({
        type: 'POST',
        url: this.props.url,
        data: data || this.state.data,
        success: data => {
          callback(data)
        }
      })
    }
  }

  render() {
    const { items } = this.props
    const data = this.state.data
    return (
      <View style={style.form}>
        {items.map((item, i) => {
          const { name, label, type } = item
          const handlePress = this.handleTypePress[type]
          return (
            <Term.Item 
              key={name}
              style={style.formItem} 
              onPress={handlePress && handlePress.bind(this, data, item)} 
              label={label + ':'} 
            >
              {this.handleTypeRender[type](data, item)}
            </Term.Item>
          )
        })}
      </View>
    )
  }
}

Form.propTypes = {
  items: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired
}

export default Form