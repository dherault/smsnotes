import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import routes from './routes';
import configureStore from './state/configureStore';
import registerSideEffects from './registerSideEffects';

console.log('Hello client!');

// Redux store creation
const store = configureStore();

// Side effects activation
registerSideEffects(store);

// User interface rendering
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root'),
  () => console.log('App rendered!')
);

// Stylesheets injection
require('./stylesheets/app.css');
