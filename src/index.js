import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './composeAssets';
import App from './containers/App';
// import Profile from './screens/Profile'
import MonHoc from './screens/MonHoc'

ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App}/>
        {/*<Route exact path="/profile" component={Profile}/>*/}
        <Route exact path="/monhoc/:monHoc" component={MonHoc}/>
      </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
