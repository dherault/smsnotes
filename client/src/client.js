import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

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

// http://www.material-ui.com/#/get-started/installation
injectTapEventPlugin();
