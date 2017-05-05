import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

// containers
import AppContainer from '../../ui/containers/AppContainer.jsx'
import MainContainer from '../../ui/containers/MainContainer.jsx'

import PlantMonitorContainer from '../../ui/PlantMonitorContainer.jsx';

import createHistory from 'history/createBrowserHistory';
// pages
import SignupPage from '../../ui/pages/SignupPage.jsx'
import LoginPage from '../../ui/pages/LoginPage.jsx'

export const renderRoutes = () => (
  <Router history={createHistory}>
    <Route path="login" component={LoginPage}/>
    <Route path="signup" component={SignupPage}/>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={MainContainer}/>
      <Route path="plantmonitor" component={MainContainer}/>
    </Route>
  </Router>
);
