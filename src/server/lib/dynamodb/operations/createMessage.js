import ApigError from '../../ApigError';
import { logDb, logError } from '../../../../shared/logger';
import { dbClient, tables } from '../main';
import deserialize from '../deserialize';

export default function createMessage({ id, sender, receiver, content, timestamp }) {
  
  logDb('createMessage', id);
  
  return new Promise((resolve, reject) => {
    
    const nowString = Date.now().toString(10);
    const phoneParams = {
      TableName: tables.messages.TableName,
      Item: {
        id: {
          S: id
        },
        sender: { // Primary index
          S: sender
        },
        receiver: {
          S: receiver
        },
        content: {
          S: content
        },
        timestamp: {
          S: timestamp
        },
        createdAt: {
          N: nowString
        },
        updatedAt: {
          N: nowString
        },
      },
      ConditionExpression: 'attribute_not_exists(id)', // unicity condition
    };
    
    dbClient.putItem(phoneParams, (err, data) => {
      if (err) {
        logError('createMessage/putItem', err);
        return reject(err.code === 'ConditionalCheckFailedException' ? 
          new ApigError(409, 'Message already exists') :
          new ApigError() // 500
        );
      }
      
      resolve(deserialize(phoneParams.Item));
    });
  });
}
