import React, {Component} from 'react';
import {Switch, Redirect} from 'react-router-dom';
import Loading from '../commons/loading-page/Loading';
import JrRoute from '../commons/Route';
import Loadable from 'react-loadable';
import AppHeader from '../commons/app-header/app-header';
const LoadableHome = Loadable({
    loader: () => import('../screens/home/index'),
    loading: Loading
});

class App extends Component {

    render() {
      return (
        <div>
        <AppHeader/>
        <Switch>
              <JrRoute exact path="/home" component={LoadableHome}/>
              <Redirect to="/home"/>
          </Switch>
        </div>
          
      )
    }
}

export default App;
