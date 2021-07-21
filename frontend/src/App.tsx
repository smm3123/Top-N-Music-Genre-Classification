import React from "react";
import "./App.css";
import HeaderBar from "./components/HeaderBar";
import { FC } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Algorithm from "./Algorithm";
import Team from "./Team";
import BackendTest from "./BackendTest";

const App: FC = () => {
  return (
    <Router>
      <div className="App">
        <HeaderBar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/algorithm">
              <Algorithm />
            </Route>
            <Route path="/aboutus">
              <Team />
            </Route>
			<Route path="/test">
              <BackendTest />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
