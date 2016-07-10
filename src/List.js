/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule List.js
 */

import React, { Component, PropTypes } from 'react'
import { Text, View, TouchableHighlight, ScrollView } from 'react-native'
import SearchBar from 'react-native-search-bar'
import Fetch from './Fetch'

const style = {
  item: {
    padding: 10,
    borderBottomWidth: 1, 
    borderBottomColor: '#ececec'
  },
  empty: {
    flex: 1,
    textAlign: 'center',
    padding: 40,
    color: '#999'
  }
}

class List extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list: props.data || []
    }
  }

  componentWillReceiveProps(nextProps) {
    nextProps.data && this.setState({data: nextProps.data})  
  }

  handleLoad(list) {
    this.setState({ list })
    this.list = list
  }

  handleSearch(text) {
    const searchCol = this.props.searchCol
    let list = this.list
    if (text) {
      list = list.filter(item => item[searchCol].indexOf(text) !== -1)
    } 
    this.setState({ list })
  }

  update() {
    this.refs.fetch.update()
  }

  render() {
    const { url, onItemPress, render, emptyMessage } = this.props
    const list = this.state.list
    return (
      <View>
        <SearchBar placeholder="搜索" onChangeText={this.handleSearch.bind(this)} />
        <Fetch 
          ref="fetch"
          url={url} 
          onLoad={this.handleLoad.bind(this)} 
        >
          <ScrollView style={{height: 500}}>
            {list && list.length ? list.map((item, i) => {
              const view = render(item)
              return onItemPress ?
                <TouchableHighlight 
                  style={style.item}
                  key={i}
                  underlayColor="#ececec"
                  onPress={onItemPress.bind(this, item)}
                >
                  {view}
                </TouchableHighlight> :
                <View key={i} style={style.item}>{view}</View>
            }) : <Text style={style.empty}>{emptyMessage || '暂无数据'}</Text>}
          </ScrollView>
        </Fetch>
      </View>
    )
  }
}

List.propTypes = {
  url: PropTypes.string, 
  emptyMessage: PropTypes.string,
  data: PropTypes.array, 
  render: PropTypes.func, 
  onItemPress: PropTypes.func,
  searchCol: PropTypes.string
}

export default List