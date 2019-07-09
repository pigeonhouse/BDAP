import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import HomePage from './Homepage';
import  "./index.less"

ReactDOM.render(
    <Router>
        <div>
            <Route path="/" exact component={HomePage} />
        </div>
    </Router>
    , document.getElementById('root'));
window.onload = function(){
    setTimeout(function(){
        var loader = document.getElementsByClassName("loader")[0];
        loader.className="loader fadeout" ;
        setTimeout(function(){loader.style.display="none"},2000)
    },1000)
}
/*window.onload = function(){
    setTimeout(function(){
        var loader = document.getElementsByClassName("loader")[0];
        loader.className="loader fadeout" ;
        setTimeout(function(){loader.st.display="none"},1000)
    },1000)
}*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
