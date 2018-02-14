import React, { Component } from 'react'
import { View, Text, Image, Dimensions } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import styles, { colors } from './styles/index.style'
import { sliderWidth, itemWidth } from './styles/SliderEntry.style'
import SliderEntry from './SliderEntry'
import { connect } from 'react-redux'
import { getLastProductsFromSubscriber, getNearProducts } from '../../actions'

class MyCarousel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slider1ActiveSlide: 1,
      slider1Ref: null
    }
  }

  _renderItemWithParallax ({item, index}, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    )
  }

  render () {
/*    if (this.props.type === 'subscriptions' && this.props.subscriptionsProducts.length === 0) {
      return (
        <Text>Vous n'avez pas encore d'abonnements.</Text>
      )
    }
    else if (this.props.type === 'near' && this.props.nearProducts.length === 0) {
      return (<Text>Aucun produits autour de vous.</Text>)
    }*/
    return (
      <View style={styles.exampleContainer}>
        <Carousel
          ref={(c) => {
            if (!this.state.slider1Ref) {
              this.setState({slider1Ref: c})
            }
          }}
          data={this.props.data}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={1}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          enableMomentum={false}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={1}
        />
      </View>
    )
  }

  //helper
}

const mapStateToProps = state => {
  return {
    lat: state.geolocation.latitude,
    lng: state.geolocation.longitude
  }
}
export default connect(mapStateToProps,{})(MyCarousel)