import ApigError from '../../ApigError';
import { logDb, logError } from '../../logger';
import { dbClient, tables } from '../main';
import deserialize from '../deserialize';

export default function createPhone({ id }) {
  
  logDb('createPhone', id);
  
  return new Promise((resolve, reject) => {
    
    if (typeof id !== 'string') return reject(new Error('Invalid id'));
    
    const nowString = new Date().getTime().toString(10);
    const phoneParams = {
      TableName: tables.phones.TableName,
      Item: {
        id: {
          S: id
        },
        createdAt: {
          N: nowString // Yes, number type is a string.
        },
        updatedAt: {
          N: nowString
        },
      },
      ConditionExpression: 'attribute_not_exists(id)', // unicity condition
    };
    
    dbClient.putItem(phoneParams, (err, data) => {
      if (err) {
        logError('createPhone/putItem', err);
        return reject(err.code === 'ConditionalCheckFailedException' ? 
          new ApigError(409, 'Phone already exists') :
          new ApigError() // 500
        );
      }
      
      resolve(deserialize(phoneParams.Item));
    });
  });
}
