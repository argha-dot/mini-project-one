import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
    
    audience={process.env.REACT_APP_AUTH0_AUDIENCE}
    scope={process.env.REACT_APP_AUTH0_SCOPE} 
    > 
  <Provider store={store}><BrowserRouter>
    <App /> 
  </BrowserRouter></Provider>
  </Auth0Provider>,
  document.getElementById('root') 
); 

