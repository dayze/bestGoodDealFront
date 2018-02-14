import React, { Component } from 'react'
import {
  Scene,
  Router
} from 'react-native-router-flux'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import LoginForm from './components/LoginForm'
import { fillToken } from './actions'
import Home from './components/Home'
import Maps from './components/Maps'
import Picture from './components/Picture'
import PictureForm from './components/PictureForm'
import MoreItems from './components/MoreItems'

class RouterComponent extends Component {

  componentDidMount () {
    /*this.props.fillToken()*/ // cause warning
  }

  render () {
    return (
      <Router>
        <Scene hideNavBar>
          <Scene key="auth">
            <Scene key="login" component={LoginForm} title="Please Login"/>
          </Scene>
          <Scene key="main">
            <Scene key="home" component={Home} title="Accueil"/>
            <Scene key="maps" component={Maps}/>
            <Scene key="picture" component={Picture}/>
            <Scene key="pictureForm" component={PictureForm}/>
            <Scene key="more" component={MoreItems}/>
          </Scene>
        </Scene>
      </Router>
    )
  }
}


const mapStateToProps = state => {
  return {
    email: state.auth.user.email,
    token: state.auth.user.token
  }
}

export default connect(mapStateToProps, {fillToken})(RouterComponent)

/*
<Scene key="main">
  <Scene key="home" component={Home} title="Accueil"/>
  <Scene key="picture" component={Picture}/>
<Scene key="pictureForm" component={PictureForm}/>
<Scene key="maps" component={Maps}/>
<Scene key="more" component={MoreItems}/>
</Scene>*/
