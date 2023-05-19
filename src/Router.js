// Router.js

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserPage from './UserPage';
import Dobby from './Dobby';
import Report from './Report';
import Working from './Working';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/userpage" component={UserPage} />
        <Route exact path="/dobby" component={Dobby} />
        <Route exact path="/report" component={Report} />
        <Route exact path="/working" component={Working} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
