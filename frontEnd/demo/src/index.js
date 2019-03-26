import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import RouteMode from './pages/Route';
import LocalModePage from './pages/LocalMode';
import ClusterModePage from './pages/ClusterMode'

ReactDOM.render(
  <Router>
    <div>
      <Route path="/" exact component={HomePage} />
      <Route path="/route" component={RouteMode} />
      <Route path="/local" component={LocalModePage} />
      <Route path="/cluster" component={ClusterModePage} />

    </div>
  </Router>,
  document.getElementById('root'),
);
