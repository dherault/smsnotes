import { logSms, logError } from '../../../shared/logger';
import ApigError from '../ApigError';
import createMessage from '../dynamodb/operations/createMessage';
import invokePusher from './invokePusher';

// Processes an inbound message
export default function processMessage({ id, sender, receiver, content, timestamp }) {
  
  if (!(id && sender && receiver && content && timestamp)) {
    logError('Invalid sms, responding 400', JSON.stringify({ id, sender, receiver, content, timestamp }));
    return Promise.reject(new ApigError(400, 'Invalid sms'));
  }
  
  logSms('Processing SMS from', sender, 'to', receiver);
  
  return Promise.all([
    invokePusher({ sender, content }), // Send websocket push
    createMessage({ id, sender, receiver, content, timestamp }) // Add to database
  ]).then(() => true); // Save brandwith?
}
