import { syncHistory, routerReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import reducers from './reducers';
import promiseMiddleware from './promiseMiddleware';

export default function configureStore(initialState={}) {

  // App creation
  const reducer = combineReducers(Object.assign({ routing: routerReducer }, reducers));
  const enhancer = compose(
    applyMiddleware(promiseMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  const store = createStore(reducer, initialState, enhancer);

  // Enables Webpack hot module replacement for reducers
  if (module.hot) module.hot.accept('./reducers.js', () => store.replaceReducer(require('./reducers.js')));

  return store;
}
