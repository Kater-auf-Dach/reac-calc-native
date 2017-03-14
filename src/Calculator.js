import React, { Component } from 'react'
import { View, Text, AppRegistry, ToolbarAndroid, TouchableOpacity, StyleSheet, Navigator, TouchableHighlight } from 'react-native'

import { toolbarStyles, calculatorStyles, displayStyles, buttonStyles } from './Styles'
import { Display } from './Display'
import { Button, DigitKey, FuncKey } from './Button'

import Memory from './History'

class Calculator extends Component {
  constructor (props) {
    super(props)

    this.state = {
      inputedValue: '0',
      isNumberNegative: false,
      isCalculated: false,
      isNeedOperand: false
    }

    this.handleDigit = this.handleDigit.bind(this)
    this.handleOperator = this.handleOperator.bind(this)
    this.handleDot = this.handleDot.bind(this)
    this.handlePercent = this.handlePercent.bind(this)
    this.toggleSign = this.toggleSign.bind(this)
    this.clearAll = this.clearAll.bind(this)
    this.clearLast = this.clearLast.bind(this)

    this.handlePress = this.handlePress.bind(this)
  }

  handleDigit (digit) {
    const { inputedValue } = this.state

    this.setState({
      inputedValue: inputedValue === '0' || inputedValue === '-0' ? String(digit) : inputedValue + digit,
      isCalculated: false,
      isNeedOperand: false
    })
  }

  handleOperator (operator) {
    const { inputedValue, isNeedOperand } = this.state

    if (operator === '=') {
      let computedResult = parseFloat(eval(inputedValue).toFixed(12))
      let result = ''

      if (isFinite(computedResult)) {
        result = computedResult
      } else {
        switch (computedResult) {
          case Infinity:
            result = '∞'
            break
          case -Infinity:
            result = '-∞'
            break
          default:
            result = 'Error'
            break
        }
      }

      this.setState({
        inputedValue: result,
        isCalculated: true,
        isNeedOperand: false
      })
      this.handleHistoryItemAdd(inputedValue + '=' + eval(inputedValue))
    } else {
      if (isNeedOperand) {
        this.setState({
          inputedValue: inputedValue.slice(0, -1) + operator,
          isCalculated: false,
          isNeedOperand: true
        })
      } else {
        this.setState({
          inputedValue: inputedValue + operator,
          isCalculated: false,
          isNeedOperand: true
        })
      }
    }
  }

  handleDot () {
    const { inputedValue } = this.state

    if (!(/\./).test(inputedValue)) {
      this.setState({
        inputedValue: inputedValue + '.'
      })
    }
  }

  handlePercent () {
    this.setState({
      inputedValue: String(parseFloat(this.state.inputedValue) / 100),
      isCalculated: true
    })
  }

  toggleSign () {
    const { inputedValue, isNumberNegative, isNeedOperand } = this.state

    if (isNeedOperand) {
      let valueLength = inputedValue.length,
        signlessString = inputedValue.slice(0, -1),
        operator = inputedValue.charAt(inputedValue.length - 1),
        newValue = (signlessString * -1) + operator

      this.setState({
        inputedValue: newValue,
        isNumberNegative: false
      })
    } else if (isNumberNegative) {
      this.setState({
        inputedValue: String(inputedValue * -1),
        isNumberNegative: false
      })
    } else {
      this.setState({
        inputedValue: '-' + inputedValue,
        isNumberNegative: true
      })
    }
  }

  clearAll () {
    this.setState({
      inputedValue: '0',
      isCalculated: false
    })
  }

  clearLast () {
    const { inputedValue } = this.state

    if (inputedValue.length !== 1) {
      this.setState({
        inputedValue: inputedValue.slice(0, -1)
      })
    } else {
      this.setState({
        inputedValue: '0'
      })
    }
  }


   handleHistoryItemAdd (item) {
        this.props.onHistoryItemAdd(item)
    }

  handlePress () {
    this.props.navigator.push({id: 2})
  }

  render () {
    return (

    <View style={{ flex: 1 }}>
        <ToolbarAndroid style={toolbarStyles.root}>
            <Text style={toolbarStyles.text}>React Calc Native</Text>
        </ToolbarAndroid>

        <View style={{ flex: 1 }}>
            <Display display={this.state.inputedValue} style={displayStyles.root} />

            <View style={calculatorStyles.body}>
                <View style={calculatorStyles.row}>
                    {this.state.isCalculated ?
                        <FuncKey onPress={this.clearAll}>AC</FuncKey>
                        :
                        <FuncKey onPress={this.clearLast}>CE</FuncKey>
                    }
                    <FuncKey onPress={this.toggleSign}>±</FuncKey>
                    <FuncKey onPress={this.handlePercent}>%</FuncKey>
                    <FuncKey onPress={this.handleOperator}>/</FuncKey>
                </View>
                <View style={calculatorStyles.row}>
                    <DigitKey onPress={this.handleDigit} >7</DigitKey>
                    <DigitKey onPress={this.handleDigit} >8</DigitKey>
                    <DigitKey onPress={this.handleDigit} >9</DigitKey>
                    <FuncKey onPress={this.handleOperator}>*</FuncKey>
                </View>
                <View style={calculatorStyles.row}>
                    <DigitKey onPress={this.handleDigit} >4</DigitKey>
                    <DigitKey onPress={this.handleDigit} >5</DigitKey>
                    <DigitKey onPress={this.handleDigit} >6</DigitKey>
                    <FuncKey onPress={this.handleOperator}>-</FuncKey>
                </View>
                <View style={calculatorStyles.row}>
                    <DigitKey onPress={this.handleDigit} >1</DigitKey>
                    <DigitKey onPress={this.handleDigit} >2</DigitKey>
                    <DigitKey onPress={this.handleDigit} >3</DigitKey>
                    <FuncKey onPress={this.handleOperator}>+</FuncKey>
                </View>
                <View style={calculatorStyles.row}>
                    <FuncKey textStyle={this.props.history.length > 0 ? '' : buttonStyles.disabled} onPress={this.handlePress}>ME</FuncKey>
                    <DigitKey onPress={this.handleDigit}>0</DigitKey>
                    <DigitKey onPress={this.handleDot}>.</DigitKey>
                    <FuncKey onPress={this.handleOperator}>=</FuncKey>
                </View>
            </View>

        </View>
    </View>
    )
  }
}


export default Calculator
