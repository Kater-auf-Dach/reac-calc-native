import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { displayStyles } from './Styles'

class Display extends Component {

  render () {
    const { display, style } = this.props

    return (
      <View style={style}>
        <Text style={displayStyles.text}>{display}</Text>
      </View>
    )
  }
}

export { Display }
