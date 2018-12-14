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
import {getStorage} from "../services/StorageService";

import './index.css'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      token: getStorage('authorization'),
    };
    this.reloadHomePage = this.reloadHomePage.bind(this);
  }

  reloadHomePage= () => {
    this.setState({
      token: getStorage('authorization'),
    })
  };


  render() {
    return (
      <div>
        {/*<Row style={{position: 'fixed', zIndex: '1000'}}>*/}
        <AppHeader reloadHomePage={this.reloadHomePage} />
        {/*</Row>*/}
        <GoogleAds />
        <Promotion />
        {
          this.state.token ?
            <Row>
              <HomePage />
            </Row>
            :
            null
        }
      </div>

    )
  }
}

export default App;
