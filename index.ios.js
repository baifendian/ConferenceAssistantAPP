import React, { Component } from 'react'
import { AppRegistry, TabBarIOS, AsyncStorage, AlertIOS } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Conference from './modules/conference'
import Contacts from './modules/contacts'
import Todos from './modules/todos'
import Mine from './modules/mine'
import Login from './modules/Login'
import xhr from './modules/xhr'

// global.user = {
//   name: '李金ds伟',
//   uid: 'jinwei',
//   email: 'jinwei.li@baifendian.com',
//   token: 'tmd'
// }

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'conference'
    }
  }

  componentWillMount() {
    global.now = new Date()

    const userString = AsyncStorage.getItem('user', (err, result) => {
      debugger
    })

    // global.user = userString ? JSON.parse(userString) : null

    xhr.baseUrl = 'http://10.11.6.170:8080/ca/'
    // xhr.baseUrl = 'http://127.0.0.1:3000/'
    xhr.header = {}
    if (global.user) {
      xhr.header.token = global.user.token
    }
    xhr.success = (res, option) => {
      switch (res.code) {
        case 200:
          option.success && option.success(res.data)
          break
        case 502:
          global.user = null
          this.forceUpdate()
          break
        default:
          AlertIOS.alert(res.message || 'unknown error')
      }
    }
  }

  handleLogin(data) {
    // AsyncStorage.setItem('user', JSON.stringify(data))
    global.user = data
    xhr.header.token = global.user.token
    this.forceUpdate()
  }

  render() {
    if (!global.user) {
      return <Login onLogin={this.handleLogin.bind(this)} />
    }
    return (
      <TabBarIOS
        style={{height: 150}}
        unselectedTintColor="#666"
        tintColor="#0e78e7"
        barTintColor="#eee"
      >
        <Icon.TabBarItemIOS
          title="会议"
          iconName="commenting-o"
          iconSize={20}
          selected={this.state.selectedTab === 'conference'}
          onPress={() => {
            this.setState({
              selectedTab: 'conference'
            })
          }}
        >
          <Conference />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="通讯录"
          iconName="users"
          iconSize={20}
          selected={this.state.selectedTab === 'contacts'}
          onPress={() => {
            this.setState({
              selectedTab: 'contacts'
            })
          }}>
          <Contacts />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="待办"
          badge={2}
          iconName="history"
          iconSize={20}
          selected={this.state.selectedTab === 'todos'}
          onPress={() => {
            this.setState({
              selectedTab: 'todos'
            })
          }}>
          <Todos />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="我"
          iconName="user"
          iconSize={20}
          selected={this.state.selectedTab === 'mine'}
          onPress={() => {
            this.setState({
              selectedTab: 'mine'
            })
          }}>
          <Mine />
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    )
  }
}

AppRegistry.registerComponent('ConferenceAssistantAPP', () => App)
