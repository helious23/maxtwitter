import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../Routes/Auth";
import Home from "../Routes/Home";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/" component={Home} />
          </>
        ) : (
          <Route exact path="/" component={Auth} />
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
