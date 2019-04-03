import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
// import MapPage from './routes/googleMap';
// import reactBootstrap from './routes/reactBootstrap';
// import reactJquery from './routes/reactJquery';



function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
