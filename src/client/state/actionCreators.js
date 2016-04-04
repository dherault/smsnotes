/* global fetch */
import config from '../config';
import { logAction, logFetch } from '../../shared/logger';

export const setSender = params => ({
  params,
  type: 'SET_SENDER',
});

export const addMessage = params => ({
  params,
  type: 'ADD_MESSAGE',
});

export const readMessages = createActionCreator('readMessages', ({ sender, before, limit }) => {
  
  if (!sender) throw new Error(`readMessages missing 'sender' param`);
  
  return `{readMessages(sender:"${sender}"` +
    (before ? `,before:${before}` : '') +
    (limit ? `,limit:${limit}` : '') +
    '){createdAt,content}}';
});

// Creates async actionCreators that calls the GraphQL endpoint
function createActionCreator(intention, getQuery) {
  
  return params => {
    
    const query = getQuery(params);
    const options = { 
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: { 
        ['Content-Type']: 'application/json'
      },
    };
    
    logAction(intention, params);
    logFetch('-→', query);
    
    return {
      params,
      intention,
      types: ['REQUEST', 'SUCCESS', 'FAILURE'].map(t => `${t}_${intention.replace(/[A-Z]/g, '_$&')}`.toUpperCase()),
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
