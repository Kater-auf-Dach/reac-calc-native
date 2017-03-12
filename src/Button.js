import React, { Component } from 'react'
import { View, Text, TouchableHighlight, Dimensions } from 'react-native'

import { buttonStyles } from './Styles'

class Button extends Component {
  render () {
    const { children, onPress, style, textStyle } = this.props
    // const {height, width} = Dimensions.get('window')

    function handlePress (button) {
      onPress(button)
    }

    return (
      <TouchableHighlight onPress={() => handlePress(children)} accessibilityRole='button' style={[buttonStyles.root, style]}>
        <Text children={children} style={[buttonStyles.text, textStyle]} />
      </TouchableHighlight>
    )
  }
}

const DigitKey = props => (
  <Button {...props} style={[buttonStyles.digitKeys, props.style]} textStyle={[buttonStyles.digitKeysText, props.textStyle]} />
)

const FuncKey = props => (
  <Button {...props} style={[buttonStyles.funcKeys, props.style]} textStyle={[buttonStyles.funcKeysText, props.textStyle]} />
)

export { Button, DigitKey, FuncKey }
