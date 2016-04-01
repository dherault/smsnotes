import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, RouterContext, browserHistory } from 'react-router';

import routes from './routes';
import configureStore from './state/configureStore';

console.log('Hello client!');

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// User interface rendering
render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root'),
  () => console.log('App rendered!')
);
