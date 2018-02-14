import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setPosition } from './../actions'

class Geolocation extends Component {
  componentDidMount () {
    this.props.setPosition()
  }

  render () {
    return null
  }
}

const mapStateToProps = state => {
  return {
    latitude: state.geolocation.latitude,
    longitude: state.geolocation.longitude,
    error: state.geolocation.error
  }
}
export default connect(mapStateToProps, {setPosition})(Geolocation)