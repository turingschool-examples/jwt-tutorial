import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import App from './components/App'
import Home from './components/Home'
import Admin from './components/Admin'
import Login from './components/Login'
import './app.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="admin" component={Admin} />
      <Route path="login" component={Login} />
    </Route>
  </Router>,
  document.querySelector('#root')
);