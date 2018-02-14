import React, { Component } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import Camera from 'react-native-camera'
import Axios from 'axios'

import { global } from './../assets/styles'
import { GlobalStyle } from '../assets/styles'
import { Button } from './../components/common'
import { connect } from 'react-redux'
import {pictureTook } from './../actions'

class Picture extends Component {
  constructor () {
    super()
    this.camera = null

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto
      },
      isRecording: false
    }
  }

  render () {
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam
        }}
        style={styles.preview}
        captureTarget={Camera.constants.CaptureTarget.disk}
        aspect={Camera.constants.Aspect.fill}>
        <Button
          withoutText={true}
          style={GlobalStyle.captureButton}
          onPress={this.takePicture}
        >
          <Image
            source={require('./../assets/img/ic_photo_camera_36pt.png')}
          />
        </Button>
      </Camera>
    )
  }


  takePicture = () => {
    if (this.camera) {
      this.camera.capture().
        then((data) => {
          console.log('takepicture')
          this.props.pictureTook(data.path)
        }).
        catch(err => console.error(err))
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})

const mapStateToProps = state => {
  return {
    path: state.picture.path,
    isTook: state.picture.isTook
  }
}

export default connect(mapStateToProps, {pictureTook})(Picture)