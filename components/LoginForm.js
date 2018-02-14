import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { emailChanged, passwordChanged, loginUser } from '../actions'
import { Card, CardSection, Input, Button } from './common'
import { Spinner } from './common/Spinner'

class LoginForm extends Component {
  onEmailChange (text) {
    this.props.emailChanged(text)
  }

  onPasswordChange (text) {
    this.props.passwordChanged(text)
  }

  onButtonPress () {
    const {email, password} = this.props
    this.props.loginUser({email, password})
  }

  renderButton () {
    if (this.props.isSpinning) {
      return (
        <Spinner/>
      )
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Connexion/Inscription
      </Button>
    )
  }

  render () {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
            autoCapitalize='none'
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Mot de passe"
            placeholder="*********"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    )
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    isSpinning: state.auth.isSpinning
  }
}

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm)