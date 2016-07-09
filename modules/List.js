import React, { Component, PropTypes } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
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

  render() {
    const { url, onItemPress, render } = this.props
    const list = this.state.list
    return (
      <View>
        <SearchBar placeholder="搜索" onChangeText={this.handleSearch.bind(this)} />
        <Fetch 
          url={url} 
          onLoad={this.handleLoad.bind(this)} 
        >
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
          }) : <Text style={style.empty}>暂无数据</Text>}
        </Fetch>
      </View>
    )
  }
}

List.propTypes = {
  url: PropTypes.string, 
  data: PropTypes.array, 
  render: PropTypes.func, 
  onItemPress: PropTypes.func,
  searchCol: PropTypes.string
}

export default List