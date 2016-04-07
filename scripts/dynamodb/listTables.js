import { dbClient } from '../../src/server/lib/dynamodb/main';

dbClient.listTables((err, data) => {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
