import { logSms } from '../../../shared/logger';
import ApigError from '../ApigError';
// import readPhone from '../../shared/dynamodb/operations/readPhone';
// import createPhone from '../../shared/dynamodb/operations/createPhone';
import createMessage from '../dynamodb/operations/createMessage';

export default function processMessage({ id, sender, receiver, content, timestamp, type }) {
  
  if (!(id && sender && receiver && content && timestamp && type === 'text')) return Promise.reject(new ApigError(400, 'Invalid sms'));
  
  logSms('Processing SMS from', sender, 'to', receiver);
  
  return createMessage({ id, sender, receiver, content, timestamp });
  // return readOrCreatePhone(sender).then(phone => {
  //   logSms('readOrCreatePhone resolved:', phone.id);
    
  // });
}


// function readOrCreatePhone(id) {
//   return readPhone(id).catch(err => {
//     logSms('readOrCreatePhone', err.message);
    
//     if (err.statusCode === 404) return createPhone({ id });
    
//     throw err;
//   });
// }
