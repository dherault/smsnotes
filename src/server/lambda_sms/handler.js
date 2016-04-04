import 'babel-polyfill'; // node v0.10... What were they thinking?!!!
import onLambda from '../lib/onLambda';
import processMessage from '../lib/sms/processMessage';

export default (event, context) => {
  
  if (onLambda) {
    console.log('___NEW MESSAGE___');
    console.log(event.sourceIp);
    console.log(event.querystring);
  }
  
  // todo: restric ips (aws-configured)
  // 174.37.245.32/29
  // 174.36.197.192/28
  // 173.193.199.16/28
  // 119.81.44.0/28
  
  // Parsig URL queries can result in number types (on 'receiver', 'phoneId' and 'content' keys). 
  // We want strings.
  const message = {};
  for (let key in event.message) {
    message[key] = event.message[key].toString();
  }
  
  return processMessage(message);
};

