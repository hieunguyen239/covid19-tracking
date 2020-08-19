import React from "react";
import HomePage from '../../pages/home';
import ViewCountry from '../../pages/country';
import PageNotFound from '../../pages/404';
import { HOME_ROUTE, VIEW_COUNTRY_ROUTE } from '../../constants/route_names';
import { Container } from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function () {
  return (
    <Container>
      <Router>
        <Switch>
          <Route exact path={HOME_ROUTE} component={HomePage}/>
          <Route path={`${VIEW_COUNTRY_ROUTE}/:slug`} component={ViewCountry}/>
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </Container>
  )
}