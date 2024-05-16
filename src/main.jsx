import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "jquery/dist/jquery.min.js";
import 'bootstrap/dist/js/bootstrap.bundle'
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import FooterComponent from "./components/FooterComponent.jsx";
import {BrowserRouter} from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent.jsx";



const store = createStore({
    authName:'_auth',
    authType:'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: false,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider store={store}>
          <BrowserRouter>
              <HeaderComponent/>
              <App />
              <FooterComponent/>
          </BrowserRouter>
      </AuthProvider>
  </React.StrictMode>,
)
