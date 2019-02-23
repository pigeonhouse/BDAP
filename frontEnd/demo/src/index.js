import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import FlowPage from './pages/Flow';

ReactDOM.render(
  <Router>
    <div>
      <Route path="/" exact component={HomePage} />
      <Route path="/flow" component={FlowPage} />

    </div>
  </Router>,
  document.getElementById('root'),
);
