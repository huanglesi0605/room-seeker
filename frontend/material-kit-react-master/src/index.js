import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// our imports
import WelcomePage from "ourComponents/welcomePage/WelcomePage.js";
import LogInPage from "ourComponents/logInPage/LogInPage";
import SignUpPage from "ourComponents/signUpPage/SignUpPage";
import OurLandingPage from "ourComponents/landingPage/OurLandingPage";
import SearchPage from "ourComponents/searchPage/SearchPage";
import PropertyPage from "ourComponents/propertyPage/PropertyPage";
import PostingPage from "ourComponents/postingPage/PostingPage";
import AccountPage from "ourComponents/accountPage/AccountPage";
import Chatbot from "ourComponents/chatbotPage/chating";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/login" component={LogInPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/landing" component={OurLandingPage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/property/:propertyId" component={PropertyPage} />
      <Route path="/posting" component={PostingPage} />
      <Route path="/account" component={AccountPage} />
      <Route path="/chatbot" component={Chatbot} />
      <Route path="/" component={WelcomePage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
