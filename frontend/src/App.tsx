import React from 'react';
import './App.css';
import HeaderBar from './components/HeaderBar';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Algorithm from './Algorithm';
import Team from './Team';

const App: React.FC = () => {
  return (
    <Router forceRefresh={true}>
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
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
