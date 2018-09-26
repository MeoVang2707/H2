import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import './composeAssets';
import App from './containers/App';

ReactDOM.render(
    <BrowserRouter>
      
        <Route path="/" component={App}/>
    </BrowserRouter>, 
    document.getElementById('root')
);
registerServiceWorker();
