import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import App from './components/App'
import Home from './components/Home'
import Admin from './components/Admin'
import Login from './components/Login'
import './app.css';

const requireAuth = (nextState, replace) => {
  let token = localStorage.getItem('token');
  if (!token) {
    replace({ pathname: '/login/?next=admin' })
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="admin" component={Admin} onEnter={requireAuth} />
      <Route path="login/*" component={Login} />
    </Route>
  </Router>,
  document.querySelector('#root')
);
