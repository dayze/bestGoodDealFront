import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { ParallaxImage } from 'react-native-snap-carousel'
import styles from './styles/SliderEntry.style'
class SliderEntry extends Component {
  get image () {
    const {parallax, data: {imagePath}, parallaxProps, even} = this.props
    return (<ParallaxImage
      source={{uri: imagePath}}
      containerStyle={[
        styles.imageContainer,
        even
          ? styles.imageContainerEven
          : {}]}
      style={styles.image}
      parallaxFactor={0.35}
      showSpinner={true}
      spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
      {...parallaxProps}
    />)
  }

  render () {
    const {data: {name, user}, even} = this.props

    const uppercaseTitle = name ? (
      <Text
        style={[styles.title, even ? styles.titleEven : {}]}
        numberOfLines={2}
      >
        {name.toUpperCase()}
      </Text>
    ) : false

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => { alert(`You've clicked '${name}'`) }}
      >
        <View style={[
          styles.imageContainer,
          even
            ? styles.imageContainerEven
            : {}]}>
          {this.image}
          <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]}/>
        </View>
        <View
          style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
          {uppercaseTitle}
          <Text
            style={[styles.subtitle, even ? styles.subtitleEven : {}]}
            numberOfLines={2}
          >
            @{user}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default SliderEntry
