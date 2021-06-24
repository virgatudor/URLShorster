import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import URLRedirect from './components/URLRedirect'
import URLCard from './components/URLCard'
import URLForm from './components/URLForm'

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Switch>
          <Route exact path="/" component={URLForm} />
          <Route exact path="/:shortcode" component={URLRedirect} />
          <Route exact path="/:shortURL/stats" component={URLCard} />
        </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
