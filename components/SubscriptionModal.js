import React, { Component } from 'react'
import { View, Text, Dimensions, Alert, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { Button, FormInput, FormLabel, Icon } from 'react-native-elements'
import Axios from 'axios'
import Config from 'react-native-config'
import { connect } from 'react-redux'
import { getNearProducts } from '../actions'

class SubscriptionModal extends Component {
  constructor (props) {
    super(props)
    this.state = {emailInput: '', isVisible: false}
  }

  componentWillReceiveProps (nextProps) {
    this.setState({isVisible: nextProps.isVisible})
  }

  render () {
    return (
      <Modal isVisible={this.state.isVisible} animationIn="slideInLeft"
             animationOut="slideOutRight">
        <View style={styles.modalContent}>
          <TouchableOpacity style={{position: 'absolute', top: 2, right: 10}}
                            onPress={() => this.setState({isVisible: false})}>
            <Text>X</Text>
          </TouchableOpacity>
          <FormLabel>Adresse email</FormLabel>
          <FormInput
            autoCapitalize={'none'}
            inputStyle={{width: Dimensions.get('window').width - 90}}
            onChangeText={(val) => this.setState({emailInput: val})}
          />
          <Button
            onPress={() => {this.subscribeToUser(this.state.emailInput)}}
            style={{paddingTop: 10}}
            title='Ajouter'
          />
        </View>
      </Modal>
    )
  }

  subscribeToUser = (email) => {
    console.log(email)
    if (this.state.emailInput = '') {
      alert('Vous devez renter un email')
    } else {
      const config = {headers: {'Authorization': 'Bearer ' + this.props.token}}
      Axios.post(`${Config.API_URL}/users/subscribe`, {user: email}, config).
        then(({data}) => {
          Alert.alert(
            'Abonnement confirmé',
            `${email} a été ajouté à vos abonnements`,
            [
              {
                text: 'OK', onPress: () => {
                  this.setState({emailInput: ''})
                  this.setState({isVisible: false})
                  this.props.getNearProducts('49.215375', '-0.367362')

                }
              }
            ],
            {cancelable: false}
          )
        }).
        catch((err) => {
          alert(`Impossible de trouver ${email}`)

        })
    }
  }
}

const styles = {
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.user.token
  }
}

export default connect(mapStateToProps, {getNearProducts})(SubscriptionModal)