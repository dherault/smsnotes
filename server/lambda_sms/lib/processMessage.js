import { logSms } from '../../shared/logger';
import ApigError from '../../shared/ApigError';
import readPhone from '../../shared/dynamodb/operations/readPhone';
import createPhone from '../../shared/dynamodb/operations/createPhone';

export default function processMessage({ id, from, to, content, timestamp, type }) {
  
  if (!(id && from && to && content && timestamp && type === 'text')) return Promise.reject(new ApigError(400, 'Invalid sms'));
  
  logSms('Processing SMS from', from, 'to', to);
  
  return readOrCreatePhone(from).then(phone => {
    logSms('readOrCreatePhone resolved:', phone.id);
    
    return phone;
  });
}


function readOrCreatePhone(id) {
  return readPhone(id).catch(err => {
    logSms('readOrCreatePhone', err.message);
    
    if (err.statusCode === 404) return createPhone({ id });
    
    throw err;
  });
}
