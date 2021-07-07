import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from '../views/Homepage';
import NavBar from '../components/NavBar';

export const ROUTE_PATHS = {
  HOMEPAGE_ROUTE: '/',
};

export const ROUTE_LIST = [
  {
    path: ROUTE_PATHS.HOMEPAGE_ROUTE,
    key: 'HOMEPAGE',
    component: Homepage,
  },
];

const Routes: React.FC = () => (
  <Router>
    <NavBar />
    <Switch>
      {ROUTE_LIST.map((route) => (
        <Route key={route.key} exact path={route.path} component={route.component} />
      ))}
    </Switch>
  </Router>
);

export default Routes;
