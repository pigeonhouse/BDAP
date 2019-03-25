import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import LocalModePage from './pages/LocalMode';

ReactDOM.render(
  <Router>
    <div>
      <Route path="/" exact component={HomePage} />
      <Route path="/local" component={LocalModePage} />

    </div>
  </Router>,
  document.getElementById('root'),
);
