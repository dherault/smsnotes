import { dbClient } from '../../server/shared/dynamodb/main';

dbClient.listTables((err, data) => {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
