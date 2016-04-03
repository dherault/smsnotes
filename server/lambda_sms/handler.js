import 'babel-polyfill'; // node v0.10... What were they thinking?!!!
import processMessage from './lib/processMessage';
import onLambda from '../shared/onLambda';
// import ApigError from '../shared/ApigError';

export default (event, context) => {
  
  if (onLambda) {
    console.log('___NEW MESSAGE___');
    console.log(event.querystring);
  }
  
  // Parsig URL queries can result in number types (on 'to', 'from' and 'content' keys). 
  // We want strings.
  const message = {};
  for (let key in event.message) {
    message[key] = event.message[key].toString();
  }
  
  return processMessage(message).catch(err => err.toString());
};

