import { logDb, logError } from '../../../../shared/logger';
import { dbClient, tables } from '../main';
import deserialize from '../deserialize';
import ApigError from '../../ApigError';

export default function readMessages({ sender, before, limit }, ProjectionExpression) {
  
  logDb('readMessages', sender, before, limit);
  
  return new Promise((resolve, reject) => {
    
    // DB read parameters
    const returnLimit = 50; // caps the number of results
    const params = {
      ProjectionExpression,
      Limit: Math.min(limit, returnLimit),
      TableName: tables.messages.TableName,
      ScanIndexForward: false, // descending order
      KeyConditionExpression: 'sender = :v_sender',
      ExpressionAttributeValues: {
        ':v_sender': {
          S: sender,
        },
      },
    };
    
    if (before) {
      params.KeyConditionExpression += ' AND createdAt < :v_before';
      params.ExpressionAttributeValues[':v_before'] = {
        N: before.toString(),
      };
    }
    
    dbClient.query(params, (err, data) => {
      if (err) {
        logError('readMessages/query', err);
        return reject(new ApigError());
      }
      
      logDb(`readMessages resolved ${data.Count}/${data.ScannedCount} items`);
      resolve(deserialize(data.Items));
    });
  });
  
}
