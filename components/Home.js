import React, { Component } from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native'
import { Card, CardSection, Button } from './common'
import { connect } from 'react-redux'
import MyCarousel from './myCarousel/MyCarousel'
import { Actions } from 'react-native-router-flux'
import { GlobalStyle } from '../assets/styles'
import Geolocation from './Geolocation'

import { getLastProductsFromSubscriber, getNearProducts } from '../actions'
import SubscriptionModal from './SubscriptionModal'

class Home extends Component {
  componentWillMount () {
    this.props.getLastProductsFromSubscriber()
    this.props.getNearProducts('49.215375', '-0.367362')
  }

  componentWillUpdate (nextProps) {
    console.log('NEXTPROPSHOME', nextProps)
  }

  constructor (props) {
    super(props)
    this.state = {isSubscriptionModalVisible: false}
  }

  render () {
    const {captureButton} = GlobalStyle
    return (
      <View>
        <Geolocation/>
        <SubscriptionModal isVisible={this.state.isSubscriptionModalVisible}/>
        <Card>
          <CardSection style={{justifyContent: 'space-between'}}>
            <Text style={{fontWeight: 'bold'}}>Mes Abonnements</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{paddingRight: 10}}
                onPress={() => this.setState({isSubscriptionModalVisible: true})}>
                <Text style={{color: '#007aff'}}>+</Text>
              </TouchableOpacity>
              {this.renderMoreButton('subscriptions')}
            </View>
          </CardSection>
          <CardSection>
            {this.renderCarouselSub()}
          </CardSection>
        </Card>
        <Card>
          <CardSection style={{justifyContent: 'space-between'}}>
            <Text style={{fontWeight: 'bold'}}>Autour de moi</Text>
            {this.renderMoreButton('near')}
          </CardSection>
          <CardSection>
            {this.renderCarouselNear()}
          </CardSection>
        </Card>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            withoutText={true}
            style={[
              captureButton,
              {
                marginTop: 10,
                marginLeft: 10
              }]}
            onPress={Actions.maps}
          >
            <Image
              source={require('./../assets/img/location-34.png')}
            />
          </Button>
          <Button
            withoutText={true}
            style={[
              captureButton,
              {
                marginTop: 10,
                marginRight: 10
              }]}
            onPress={Actions.picture}
          >
            <Image
              source={require('./../assets/img/ic_photo_camera_36pt.png')}
            />
          </Button>
        </View>
      </View>
    )
  }

  //helper
  renderCarouselNear () {
    if (this.props.nearProducts.length === 0) {
      return (<Text>Aucun produit autours de vous.</Text>)
    }
    return (<MyCarousel data={this.props.nearProducts} type={'near'}/>
    )
  }

  renderCarouselSub () {
    if (this.props.subscriptionsProducts.length === 0) {
      return (
        <View style={{flexDirection: 'row'}}>
          <Text>
            Vous n'avrez pas encore d'abonnement
          </Text>
          <TouchableOpacity
            onPress={() => this.setState({isSubscriptionModalVisible: true})}>
            <Text style={{color: '#007aff'}}> Ajouter</Text>
          </TouchableOpacity>
        </View>

      )
    }
    return (<MyCarousel data={this.props.subscriptionsProducts}
                        type={'subscriptions'}/>)

  }

  renderMoreButton (from) {
    if (this.props.subscriptionsProducts.length > 0 &&
      from === 'subscriptions') {
      return this.buttonMore(from)
    }
    if (this.props.nearProducts.length > 0 && from === 'near') {
      return this.buttonMore(from)
    }
  }

  buttonMore (from) { // subscriptions || near
    return (
      <Button style={{}} withoutText={true}
              onPress={() => {Actions.more({from})}}>
        <Text style={{color: '#007aff'}}>Voir plus</Text>
      </Button>
    )
  }

}

const mapStateToProps = state => {
  return {
    nearProducts: state.product.nearProducts,
    subscriptionsProducts: state.product.subscriptionsProducts,
    email: state.auth.user.email,
    token: state.auth.user.token
  }
}

export default connect(mapStateToProps,
  {getLastProductsFromSubscriber, getNearProducts})(Home)