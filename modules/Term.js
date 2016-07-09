import React, { Component, PropTypes } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const style = {
  term: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10
  },
  termItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  termItemLabel: {
    marginRight: 5
  },
  termItemChildrenContainer: {
    flex: 1
  },
  termDivider: {
    height: 1,
    backgroundColor: '#ececec',
    marginTop: 10,
    marginBottom: 10
  }
}

const Term = props => {
  const { label, onPress, children } = props
  let view
  if (label) {
    view = (
      <View style={[onPress ? null : style.term, style.termItem]}>
        <Text style={style.termItemLabel}>{label}</Text>
        <View style={style.termItemChildrenContainer}>{children}</View>
        {onPress ? <Icon name="angle-right" color="#aaa" size={24} /> : null}
      </View>
    )
  } else {
    view = (
      <View style={style.term}>{children}</View>
    )
  }
  if (onPress) {
    view = (
      <TouchableHighlight style={style.term} onPress={onPress} underlayColor="#ececec">
        {view}
      </TouchableHighlight>
    )
  }
  return view
}

Term.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func
}


Term.Item = props => {
  const { label, onPress, children } = props
  let view = (
    <View style={[style.termItem, onPress || props.style]}>
      <Text style={style.termItemLabel}>{label}</Text>
      {
        onPress ? 
        <View style={style.termItemChildrenContainer}>{children}</View> : 
        children 
      }
      {onPress ? <Icon name="angle-right" color="#ccc" size={24} /> : null}
    </View>
  )
  if (onPress) {
    view = (
      <TouchableHighlight 
        style={props.style} 
        onPress={onPress} 
        underlayColor="#ccc"
      >
        {view}
      </TouchableHighlight>
    )
  }
  return view
}

Term.Item.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func
}


Term.Divider = props => {
  return <View style={style.termDivider} />
}

export default Term