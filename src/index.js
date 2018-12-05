import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './composeAssets';
import App from './containers/App';
import Profile from './screens/Profile'

ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/profile" component={Profile}/>
      </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
