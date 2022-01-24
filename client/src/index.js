import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
ReactDOM.render(
  // <React.StrictMode>
  <Router>
    <App />
  {/* </React.StrictMode> */}
  </Router>,
  document.getElementById('root')
);