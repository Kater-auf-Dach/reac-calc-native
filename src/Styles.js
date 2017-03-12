import { StyleSheet } from 'react-native'

const toolbarStyles = StyleSheet.create({
  root: {
    height: 56,
    backgroundColor: '#292f36'
  },

  text: {
    color: '#fff'
  }
})

const calculatorStyles = StyleSheet.create({
  body: {
    flex: 0.75,
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },

  row: {
    flex: 0.25,
    flexDirection: 'row',
    alignItems: 'stretch'
  }
})

const displayStyles = StyleSheet.create({
  root: {
    flex: 0.25,
    backgroundColor: '#292f36'
  },

  text: {
    padding: 20,
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#fff'
  }
})

const buttonStyles = StyleSheet.create({
  root: {
    width: 90,
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    textAlign: 'center',
    fontSize: 26
  },

  disabled: {
    color: '#ddd'
  },

  digitKeys: {},

  digitKeysText: {
    color: '#03A9F4'
  },

  funcKeys: {},

  funcKeysText: {
    color: '#d63c6b'
  }
})

export { toolbarStyles, calculatorStyles, displayStyles, buttonStyles }
