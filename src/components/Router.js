import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Auth from "Routes/Auth";
import Home from "Routes/Home";
import Profile from "Routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Redirect from="*" to="/" />
          </>
        ) : (
          <>
            <Route exact path="/" component={Auth} />
            <Redirect from="*" to="/" />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
