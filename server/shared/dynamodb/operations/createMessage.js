import { logDb } from '../../logger';
import { dbClient, tables } from '../main';
import deserialize from '../helpers/deserialize';

export default function createMessage({ id, from, to, content }) {
  
  logDb('createMessage', id);
  
  return new Promise((resolve, reject) => {
    
    if (typeof id !== 'string') return reject(new Error('Invalid id'));
    
    const nowString = new Date().getTime().toString(10);
    const phoneParams = {
      TableName: tables.messages.TableName,
      Item: {
        id: {
          S: id
        },
        from: {
          S: from
        },
        to: {
          S: to
        },
        content: {
          S: content
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
