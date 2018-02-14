import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Button = ({onPress, style, withoutText, children}) => {
  const display = () => {
    if (withoutText === undefined) {
      return (
        <Text style={textStyle}>
          {children}
        </Text>
      )
    } else {
      return (<View>{children}</View>)
    }
  }
  const {buttonStyles, textStyle} = styles
  return (
    <TouchableOpacity onPress={() => onPress()} style={style || buttonStyles}>
      {display()}
    </TouchableOpacity>
  )
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyles: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  }
}
export { Button }