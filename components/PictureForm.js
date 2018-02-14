import React, { Component } from 'react'
import { Picker, Text, View, TouchableOpacity } from 'react-native'
import { FormLabel, FormInput, Card, Button } from 'react-native-elements'
import { sendPicture, pictureUpdate, getNearStores } from '../actions'
import { connect } from 'react-redux'

class PictureForm extends Component {

  constructor () {
    super()
    this.state = {showPickerStore: true}
  }

  componentWillMount () {
    this.props.getNearStores(this.props.token)
  }

  render () {
    return (
      <View>
        <Card title={'Envoyer votre photo'}>
          <FormLabel>Magasin</FormLabel>
          {this.showStores()}
          <TouchableOpacity onPress={this.createStore.bind(this)}>
            {this.buttonStoreText()}
          </TouchableOpacity>
          <FormLabel>Description</FormLabel>
          <FormInput
            placeholder={'Votre description...'}
            onChangeText={(val) => this.props.pictureUpdate('name', val)}
          />
          <FormLabel>Réduction</FormLabel>
          <FormInput
            placeholder={'Le montant de la reduction en %'}
            onChangeText={(val) => this.props.pictureUpdate('promotion', val)}
          />
          <Button
            onPress={() => {this.props.sendPicture(this.props, !this.state.showPickerStore)}}
            buttonStyle={{marginTop: 10, backgroundColor: 'black'}}
            title='Envoyer'/>
        </Card>
      </View>
    )
  }

  // HELPER

  showStores () {
    console.log(this.state.showPickerStore)
    if (this.state.showPickerStore) {
      return (
        <Picker
          selectedValue={this.props.selectedStore}
          onValueChange={(itemValue, itemIndex) => this.props.pictureUpdate(
            'selectedStore', itemValue)}>
          {this.listStores()}
        </Picker>
      )
    } else {
      return (
        <FormInput
        placeholder={'Votre magasin...'}
        onChangeText={(val) => this.props.pictureUpdate('storeName', val)}
      />
      )
    }
  }

  buttonStoreText () {
    return this.state.showPickerStore ?
      <Text style={{color: '#007AFF', alignSelf: 'flex-end'}}>Vous ne trouvez pas le magasin ?</Text> :
      <Text style={{color: '#007AFF', paddingTop: 10, alignSelf: 'flex-end'}}>Voir les magasins</Text>

  }

  listStores () {
    return this.props.stores.map((store) => (
      <Picker.Item key={store._id} label={store.name} value={store._id}/>
    ))
  }

  createStore () {
    this.setState({showPickerStore: !this.state.showPickerStore})
  }
}

const mapStateToProps = state => {
  return {
    path: state.picture.path,
    isTook: state.picture.isTook,
    stores: state.picture.stores,
    name: state.picture.name,
    selectedStore: state.picture.selectedStore,
    promotion: state.picture.promotion,
    token: state.auth.user.token,
    storeName: state.picture.storeName,
    lat: state.geolocation.latitude,
    lng: state.geolocation.longitude
  }
}

export default connect(mapStateToProps,
  {sendPicture, pictureUpdate, getNearStores})(
  PictureForm)