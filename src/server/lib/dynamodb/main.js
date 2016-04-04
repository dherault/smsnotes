import AWS from 'aws-sdk';

/* This file could be splitted, but is not for dev convenience */
const config = {
  regions: ['eu-central-1'],
  
  // http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateTable.html
  getTables: ({ stage }) => {
    const createName = model => `smsnotes-${stage}-${model}`;
    
    return {
      
      /* PHONES */
      // phones: {
      //   TableName: createName('phones'),
      //   AttributeDefinitions: [
      //     {
      //       AttributeName: 'id',
      //       AttributeType: 'S',
      //     }
      //   ],
      //   KeySchema: [
      //     {
      //       AttributeName: 'id', // The phone number (ex: 33600000000)
      //       KeyType: 'HASH'
      //     }
      //   ],
      //   ProvisionedThroughput: {
      //     ReadCapacityUnits: 10, // !
      //     WriteCapacityUnits: 10 // !
      //   },
      // },
      
      /* MESSAGES */
      messages: {
        TableName: createName('messages'),
        AttributeDefinitions: [
          {
            AttributeName: 'sender', 
            AttributeType: 'S',
          },
          {
            AttributeName: 'createdAt', 
            AttributeType: 'N',
          }
        ],
        KeySchema: [
          {
            AttributeName: 'sender', // Our primary index is the phone number that sent the message
            KeyType: 'HASH'
          },
          {
            AttributeName: 'createdAt', // It's actually a composite key
            KeyType: 'RANGE'
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 10, // !
          WriteCapacityUnits: 10 // !
        },
      },
      
    };
  }
};

// Don't know how to handle multiple regions yet
config.mainRegion = config.regions[0];

const dbClient = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  region: config.mainRegion,
});

const tables = config.getTables({
  stage: process.env.SERVERLESS_STAGE || 'dev'
});

export { config, dbClient, tables };
