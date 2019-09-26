import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import RouteMode from './pages/Route';
import MainModePage from './pages/MainMode';

ReactDOM.render(
  <Router>
    <div>
      <Route path="/" exact component={HomePage} />
      <Route path="/route" component={RouteMode} />
      <Route path="/mainPage" component={MainModePage} />

    </div>
  </Router>,
  
  document.getElementById('root'),
);

window.onload = function(){
  setTimeout(function(){
  var loader = document.getElementsByClassName("loader")[0];
  loader.className="loader fadeout" ;
  setTimeout(function(){loader.style.display="none"},1000)
  },1000)
}