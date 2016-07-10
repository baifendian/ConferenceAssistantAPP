/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule conference/Home.js
 */

import React, { Component } from 'react'
import { Text, View, AlertIOS } from 'react-native'
import format from 'dateformat'
import Icon from 'react-native-vector-icons/FontAwesome'
import List from '../List'
import Select from '../Select'
import Detail from './Detail'
import UserView from '../contacts/UserView'
import xhr from '../xhr'
import style from './style/home'

class Home extends Component {

  constructor(props) {
    super(props)
    this.types = {
      '0': '#38bb0e',
      '1': '#ff7838',
      '2': '#c921f3'
    }
    this.state = {
      url: 'queryMeetingList.do?uid=' + global.user.uid
    }
  }

  handleItemPress(item) {
    this.props.navigator.push({
      title: '会议详情',
      component: Detail,
      passProps: {
        ref: component => {
          this.pushedComponent = component
        },
        ...item
      },
      rightButtonTitle: '分享',
      onRightButtonPress: this.handleShare.bind(this, item)
    })
  }

  handleShare(item) {
    this.props.navigator.push({
      title: '选择分享对象',
      component: Select,
      passProps: {
        ref: component => {
          this.pushedComponent = component
        },
        url: 'user/getAllUser',
        uniqueCol: 'name',
        searchCol: 'email',
        multiple: true,
        render: item => <UserView {...item} />
      },
      rightButtonTitle: '确定',
      onRightButtonPress: () => {
        xhr({
          url: 'share.do',
          type: 'POST',
          data: {
            meeting: item,
            shareList: this.pushedComponent.state.value
          },
          success: () => {
            AlertIOS.alert('分享成功')
            this.props.navigator.pop()
          }
        })
      }
    })
  }

  getStatus(start, end) {
    start = new Date(start)
    end = new Date(end)
    const now = +new Date()
    if (now < start) {
      let diff = Math.round((start - now) / 1000 / 60)
      if (diff < 60) {
        return (
          <View style={style.alignRight}>
            <Icon name="clock-o" style={[style.iconClock, style.warnText]} />
            <Text style={style.assistText}>还有</Text>
            <Text style={style.warnText}>{diff + '分钟'}</Text>
            <Text style={style.assistText}>召开</Text>
          </View>
        )
      } else {
        diff = Math.round(diff / 60)
        if (diff < 5) {
          return (
            <View style={style.alignRight}>
              <Icon name="clock-o" style={[style.iconClock, style.tipText]} />
              <Text style={style.assistText}>大约</Text>
              <Text style={style.tipText}>{diff + '小时后'}</Text>
              <Text style={style.assistText}>召开</Text>
            </View>
          )
        } else {
          return (
            <View style={style.alignRight}>
              <Text style={style.assistText}>{format(start, 'm月d号 HH:MM') + '召开'}</Text>
            </View>
          )
        }
      }
    } else {
      let text
      if (now < end) text = <Text style={style.warnText}>进行中</Text>
      else text = <Text style={style.assistText}>已结束</Text>
      return (
        <View style={style.alignRight}>{text}</View>
      )
    }
  }

  renderItem(item) {
    const color = this.types[item.mtype.mtid]
    return (
      <View>
        <View style={style.itemHeader}>
          <Text>{item.title}</Text>
          <Text style={[style.type, {backgroundColor: color}]}>{item.mtype.cycle}</Text>
          {this.getStatus(item.st, item.et)}
        </View>
        <Text style={style.desc}>{item.content}</Text>
        <View style={style.itemFooter}>
          <Text style={style.assist}>{item.addr}</Text>
          <Text style={style.assist}>
            {item.plist[0].name + '等' + item.plist.length + '人'}
          </Text>
          <Text style={style.date}>
            {format(item.st, 'm月d号 HH:MM') + ' 至 ' + format(item.et, 'HH:MM')}
          </Text>
        </View>
      </View>
    ) 
  }

  update() {
    this.refs.list.update()
  }

  render() {
    return (
      <List 
        ref="list"
        url={this.state.url}
        onItemPress={this.handleItemPress.bind(this)}
        render={this.renderItem.bind(this)}
        searchCol="title"
        emptyMessage="暂无会议"
      />
    )
  }
}

export default Home