/* global fetch */
import config from '../config';
import isPlainObject from 'lodash.isplainobject';
import { logAction, logFetch } from '../../shared/logger';

// An action creator takes a plain object as input (params) 
// and outputs a redux-style action ({ params, type[s], [promise] });

/* Sync Action Creators */
export const setSender = createSyncActionCreator('setSender');

export const addMessage = createSyncActionCreator('addMessage');

/* Async Action Creators */
export const readMessages = createGraphqlActionCreator('readMessages', ({ sender, before, limit }) => {
  
  if (!sender) throw new Error(`readMessages missing 'sender' param`);
  
  return `{readMessages(sender:"${sender}"` +
    (before ? `,before:${before}` : '') +
    (limit ? `,limit:${limit}` : '') +
    '){createdAt,content}}';
});

/* Utilities */

// Creates async actionCreators that calls the GraphQL endpoint
function createGraphqlActionCreator(intention, getQuery) {
  const types = ['REQUEST', 'SUCCESS', 'FAILURE'].map(createTypeFromIntention.bind(null, intention));
  
  return params => {
    
    logAction(intention, params);
    validateParams(params);
    
    const query = getQuery(params);
    const options = { 
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: { 
        ['Content-Type']: 'application/json'
      },
    };
    
    logFetch('-→', query);
    
    return {
      types,
      params,
      promise: fetch(config.graphqlEndpointUrl, options).then(response => {
        if (response.status >= 200 && response.status < 300) return response.json();
        else throw response;
      }).then(x => {
        logFetch('←-', x);
        return x;
      })
    };
  };
}

// Reduces boilerplate, ensures logging and validates params
function createSyncActionCreator(intention) {
  const type = createTypeFromIntention(intention);
  
  return params => {
    logAction(intention, params);
    validateParams(params);
    
    return { type, params };
  };
}

// doSomeStuff --> DO_SOME_STUFF
// An action has one intention (camel-cased), but can have multiple types (caps, _-separated)
function createTypeFromIntention(intention, prefix) {
  return `${prefix ? prefix + '_' :  ''}${intention.replace(/[A-Z]/g, '_$&')}`.toUpperCase();
}

function validateParams(params) {
  if (!isPlainObject(params)) throw new Error('In action: params must be a plain object!');
}
