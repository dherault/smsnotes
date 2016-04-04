import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import routes from './routes';
import configureStore from './state/configureStore';
import registerPusher from './registerPusher';

console.log('Hello client!');

const store = configureStore();
registerPusher(store);

// User interface rendering
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root'),
  () => console.log('App rendered!')
);


require('./stylesheets/app.css');
