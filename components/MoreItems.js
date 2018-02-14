import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  FlatList
} from 'react-native'
import { ENTRIES1 } from '../static/entries'
import { colors } from './../assets/styles'
import { Card, CardSection, Button } from './common'
import { connect } from 'react-redux'
import { getLastProductsFromSubscriber, getNearProducts } from '../actions'

const {height, width} = Dimensions.get('window')
const heightImage = height / 2 - 16 - 2 * 20 // todo do calcul for android

class MoreItems extends Component {

  componentWillMount () {
    this.props.from === 'subscriptions'
      ? this.props.getLastProductsFromSubscriber()
      : this.props.getNearProducts('49.215375', '-0.367362')  }

  //todo implements possible choice are : 'near' or 'subscriptions' from 'this.props.from'
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <FlatList
          data={this.props.from === 'subscriptions'
            ? this.props.subscriptionsProducts
            : this.props.nearProducts}
          renderItem={({ item }) => (
            <Card>
              <CardSection>
                <ImageBackground
                  source={{uri: item.imagePath}}
                  style={styles.image}>
                  <View style={styles.paragraphTop}>
                    <Image
                      source={{uri: 'https://images.unsplash.com/photo-1424819827928-55f0c8497861?fit=crop&w=600&h=600%27'}}
                      style={styles.imageRound}
                    />
                    <Text style={styles.textTop}>
                      @{item.user}
                    </Text>
                    <Button
                      withoutText={true}
                      style={{alignSelf: 'center'}}
                    >
                      <Image
                        source={require('./../assets/img/location-34.png')}
                      />
                    </Button>
                  </View>
                  <View style={styles.paragraphBottom}>
                    <Text style={styles.textBottom}>{item.name}</Text>
                    <Text style={styles.promotion}>-50%</Text>
                  </View>
                </ImageBackground>
              </CardSection>
            </Card>
          )}
          keyExtractor={item => item._id}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    height: heightImage,
    width: null,
    alignItems: 'baseline',
    justifyContent: 'flex-end',
    alignContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'relative'
  },
  paragraphTop: {
    paddingVertical: 2,
    flexBasis: '100%',
    flexDirection: 'row',
    paddingHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'space-between'
  },
  paragraphBottom: {
    paddingVertical: 2,
    justifyContent: 'space-between',
    flexBasis: '100%',
    flexDirection: 'row',
    paddingHorizontal: 5,
    padding: 0,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  textTop: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  textBottom: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 17
  },
  promotion: {
    backgroundColor: '#3498DC',
    alignSelf: 'center',
    lineHeight: 40,
    textAlign: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
    overflow: 'hidden',
    color: 'white',
    fontWeight: 'bold'
  },
  imageRound: {
    marginRight: 10,
    height: 45,
    width: 45,
    borderRadius: 22.5,
    alignSelf: 'center'
  },
  localisationButton: {
    padding: 7,
    backgroundColor: 'white',
    borderRadius: 0
  }
})

const mapStateToProps = state => {
  return {
    nearProducts: state.product.nearProducts,
    subscriptionsProducts: state.product.subscriptionsProducts
  }
}
export default connect(mapStateToProps, {getLastProductsFromSubscriber, getNearProducts})(
  MoreItems)

/*<Card>
  <CardSection>
    <ImageBackground
      source={{uri: item.imagePath}}
      style={styles.image}>
      <View style={styles.paragraphTop}>
        <Image
          source={{uri: 'https://images.unsplash.com/photo-1424819827928-55f0c8497861?fit=crop&w=600&h=600%27'}}
          style={styles.imageRound}
        />
        <Text style={styles.textTop}>
          {item.user}
        </Text>
        <Button
          withoutText={true}
          style={{alignSelf: 'center'}}
        >
          <Image
            source={require('./../../assets/img/location-34.png')}
          />
        </Button>
      </View>
      <View style={styles.paragraphBottom}>
        <Text style={styles.textBottom}>{item.name}</Text>
        <Text style={styles.promotion}>-50%</Text>
      </View>
    </ImageBackground>
  </CardSection>
</Card>*/
