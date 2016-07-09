import React, { Component } from 'react'
import Form from '../Form'

class NewTodo extends Component {

  constructor() {
    super()
    this.items = [{
      name: 'desc',
      label: '待办事项',
      type: 'input'
    }, {
      name: 'plist',
      label: '人员',
      type: 'select',
      labelCol: 'name',
      passProps: {
        url: 'getAllUser.do',
        uniqueCol: 'name',
        searchCol: 'email',
        render: item => <UserView {...item} />
      }
    }, {
      name: 'et',
      label: '截止日期',
      type: 'date'
    }]
    this.rules = {
      plist(v) {
        if (!v) return '请选择被邀请人'
      }
    }
    this.state = {
      deadline: new Date(),
    }
  }

  save(callback) {
    const form = this.refs.form
    form.save(callback, {
      todolist: {
        mid: this.porps.mid,
        ...form.state.data
      }
    })
  }

  render() {
    return (
      <Form 
        ref="form"
        url={'createTodolist.do'}
        navigator={this.props.navigator} 
        items={this.items} 
        rules={this.rules}
        data={this.state} 
      />
    )
  }
}

export default NewTodo