import React, {Component} from 'react';
// import {Switch, Redirect} from 'react-router-dom';
// import Loading from '../commons/loading-page/Loading';
// import JrRoute from '../commons/Route';
// import Loadable from 'react-loadable';
import {Row} from 'antd';

import AppHeader from '../commons/app-header/app-header';
import GoogleAds from '../commons/google-ads/index';
import Promotion from '../commons/promotion/index';
import HomePage from '../screens/home';
import {getStorage, set} from "../services/StorageService";

import './index.css'
import {getProfile} from "../services/apis/UserService";

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      token: getStorage('authorization'),
      point: getStorage('point'),
    };
    this.reloadHomePage = this.reloadHomePage.bind(this);
    this.reloadPoint = this.reloadPoint.bind(this);
  }

  reloadHomePage= () => {
    this.setState({
      token: getStorage('authorization'),
    })
  };

  componentDidMount(){
    this.reloadPoint()
  }

  reloadPoint = () => {
    getProfile().then(
      res => {
        if (res.Status === 200) {
          set('point', res.User.point);
          this.setState({
            point: res.User.point
          })
        }
      }
    )
  }

  render() {
    return (
      <div>
        <Row style={{height: "50px"}}>
          <AppHeader point={this.state.point} reloadHomePage={this.reloadHomePage} reloadPoint={this.reloadPoint}/>
        </Row>
        <GoogleAds />
        <Promotion />
        {
          this.state.token ?
            <Row>
              <HomePage reloadPoint={this.reloadPoint} />
            </Row>
            :
            null
        }
      </div>

    )
  }
}

export default App;
