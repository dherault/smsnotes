import Pusher from 'pusher';
import { logSms } from '../../../shared/logger';
import ApigError from '../ApigError';
// import readPhone from '../../shared/dynamodb/operations/readPhone';
// import createPhone from '../../shared/dynamodb/operations/createPhone';
import createMessage from '../dynamodb/operations/createMessage';

export default function processMessage({ id, sender, receiver, content, timestamp }) {
  
  if (!(id && sender && receiver && content && timestamp)) return Promise.reject(new ApigError(400, 'Invalid sms'));
  
  logSms('Processing SMS from', sender, 'to', receiver);
  
  return createMessage({ id, sender, receiver, content, timestamp }).then(data => new Promise((resolve, reject) => {
    new Pusher({
      appId: '194838',
      key: '20cf6fc89f9825ca708b',
      secret: '0f1cddaf8ab600207022',
      cluster: 'eu',
      encrypted: true
    }).trigger(sender, 'new_message', {
      sender,
      content,
      createdAt: data.createdAt,
    }, undefined, error => {
      if (error) {
        console.log('!!! PUSHER ERROR !!!', error);
        return reject(error);
      }
      resolve(data);
    });
  }));
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
