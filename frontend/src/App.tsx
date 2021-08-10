import React from 'react';
import './App.css';
import HeaderBar from './components/HeaderBar';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Algorithm from './Algorithm';
import Team from './Team';
import { createTheme, ThemeProvider } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default App;
