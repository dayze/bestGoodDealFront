import { StyleSheet } from 'react-native'

const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD'
}

const GlobalStyle = StyleSheet.create({
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
    marginBottom: 10
  }
})

export { GlobalStyle, colors }