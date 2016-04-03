import { dbClient, tables } from '../../server/shared/dynamodb/main';

for (let key in tables) {
  dbClient.createTable(tables[key], (err, data) => {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
}
