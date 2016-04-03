import { logDb } from '../../logger';
import { dbClient, tables } from '../main';
import deserialize from '../helpers/deserialize';

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
        logDb('Error while creating phone', err.message);
        return reject(err); // not an apigArror
      }
      
      resolve(deserialize(phoneParams.Item));
    });
  });
}
