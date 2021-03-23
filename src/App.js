import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import MainLayout from "layouts/MainLayout";
import HomePage from "pages/HomePage";
import 'assets/styles/_app.scss';

function App() {
  return (
    <Router>
      <div>
      <MainLayout/>
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
