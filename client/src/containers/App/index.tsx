import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "../Dashboard";
import SignIn from "../SignIn";
import CreateCall from "../CreateCall";
import CallDetail from "../CallDetail";
import UserProfile from "../UserProfile";
import NotFound from "../NotFound";

const App: React.FC = () => {
  return (
    <Router>
      <>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/signin" component={SignIn} />
          <Route path="/create_call" component={CreateCall} />
          <Route path="/calls/:id" component={CallDetail} />
          <Route path="/users/:id" component={UserProfile} />
          <Route component={NotFound} />
        </Switch>
      </>
    </Router>
  );
};

export default App;
