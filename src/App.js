import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./styles/App.scss";
import * as routes from "./constants/routes";
//nav stuff
import Navigation from "./components/Navigation";
import withAuthentication from "./components/withAuthentication";
import {
  HomePage,
  LandingPage,
  SignInPage,
  SignUpPage,
  AccountPage,
  PasswordForgetPage,
  ArticlesPage,
  ArticleDetailsPage,
} from "./pages";

const App = () => (
  <Router>
    <Container>
      <Navigation />
      <Switch>
        <Route exact path={routes.LANDING} component={LandingPage} />
        <Route exact path={routes.SIGN_UP} component={SignUpPage} />
        <Route exact path={routes.SIGN_IN} component={SignInPage} />
        <Route
          exact
          path={routes.PASSWORD_FORGET}
          component={PasswordForgetPage}
        />
        <Route exact path={routes.HOME} component={HomePage} />
        <Route exact path={routes.ACCOUNT} component={AccountPage} />
        <Route exact path={routes.ARTICLES} component={ArticlesPage} />
        <Route exact path={routes.ARTICLE} component={ArticleDetailsPage} />
      </Switch>
    </Container>
  </Router>
);

export default withAuthentication(App); //using HoC to handle session
