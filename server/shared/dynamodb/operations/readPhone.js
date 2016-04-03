import { logDb } from '../../logger';
import { dbClient, tables } from '../main';
import deserialize from '../helpers/deserialize';
import ApigError from '../../ApigError';

/* Read phone (by id) */
export default function readPhone(id, ProjectionExpression) {
  
  logDb('readPhone', id);
  
  return new Promise((resolve, reject) => {
    
    // DB read parameters
    const params = {
      ProjectionExpression,
      TableName: tables.phones.TableName,
      Key: {
        id: {
          S: id
        }
      },
    };
    
    dbClient.getItem(params, (err, data) => {
      if (err) return reject(err);
      
      const phone = data.Item;
      
      if (!phone) return reject(new ApigError(404, `Phone not found: ${id}`));
      
      resolve(deserialize(phone));
    });
  });
}
