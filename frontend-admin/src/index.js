import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Auth0Provider} from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

const DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
const CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;
const USER_LOGGED = 'http://localhost:3000/panel';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider 
    domain={DOMAIN} 
    clientId={CLIENT_ID} 
    redirectUri={USER_LOGGED}
    >
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
