import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain="dev-ossx.eu.auth0.com"
    clientId="caawBSZkQf2jdmrGPEeKbtEkhkZf4sFr"
    authorizationParams={{
      redirect_uri: 'http://localhost:3322/profile'
    }}
  >
    <App />
  </Auth0Provider>,
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
