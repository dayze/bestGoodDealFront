import React, { Component } from 'react'
import MapView from 'react-native-maps'
import { StyleSheet, Text } from 'react-native'
import { setPosition } from '../actions'
import { connect } from 'react-redux'
import Axios from 'axios'
import CustomCallout from './CustomCallout'
import hereIcon from './../assets/img/here.png'

class Maps extends Component {
  constructor () {
    super()
    this.markers = ''
    this.state = {data: []}
    Axios.get(
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=49.212684,-0.367362&radius=500&type=clothing_store&key=AIzaSyA1I_cVJ08JeOpWNqdI4p8ZuRYsvyfOBvA').
      then((res) => {
        console.log(res.data.results)
        this.setState(() => {
          return {data: res.data.results}
        })
      })
  }

  componentDidMount () {
  }

  render () {
    return (
      <MapView
        region={{
          latitude: this.props.userLatitude,
          longitude: this.props.userLongitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02
        }}
        style={StyleSheet.absoluteFillObject}
      >
        {this.state.data.map(marker => (
          <MapView.Marker
            key={marker.id}
            title={marker.name}
            coordinate={{
              latitude: marker.geometry.location.lat,
              longitude: marker.geometry.location.lng
            }}
          >
            {/*<MapView.Callout tooltip style={styles.customView}>
              <CustomCallout>
                <Text>This is a custom callout bubble view</Text>
              </CustomCallout>
            </MapView.Callout>*/}
          </MapView.Marker>
        ))}
        <MapView.Marker
          title="Vous êtes ici"
          image={hereIcon}
          coordinate={{
            latitude: this.props.userLatitude,
            longitude: this.props.userLongitude
          }}
        />
      </MapView>
    )
  }
}

const styles = {
  customView: {
    width: 140,
    height: 100
  }
}

const mapStateToProps = state => {
  return {
    userLatitude: state.geolocation.latitude,
    userLongitude: state.geolocation.longitude,
    error: state.geolocation.error
  }
}
export default connect(mapStateToProps, {})(Maps)