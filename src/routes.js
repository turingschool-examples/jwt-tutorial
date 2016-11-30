import React from 'react'
import {Route, IndexRedirect} from 'react-router'
import Container from './components/Container'
import Home from './components/Home'
import Admin from './components/Admin'
import Login from './components/Login'

const requireAuth = (nextState, replace) => {
  console.log("NEXT STATE: ", nextState);
  let token = localStorage.getItem('token');
  if (!token) {
    replace({ pathname: '/login/?next=admin' })
  }
}

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Home} />
      <Route path="admin" component={Admin} onEnter={requireAuth} />
      <Route path="login/*" component={Login} />
    </Route>
  )
}

export default makeMainRoutes
