import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router, Route, Link } from 'react-router';
import App from './source/modules/App.jsx';
import Product from './source/modules/Product.jsx';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/:id" component={Product} />
  </Router>
), document.getElementById('app'))