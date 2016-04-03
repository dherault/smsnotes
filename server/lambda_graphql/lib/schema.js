import {
  // GraphQLEnumType,
  // GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  // GraphQLBoolean
} from 'graphql/type';

// import {
  // GraphQLEmail,
  // GraphQLURL,
  // GraphQLDateTime,
  // GraphQLLimitedString,
  // GraphQLPassword
// } from 'graphql-custom-types'; // https://github.com/stylesuxx/graphql-custom-types

// import readPhone from '../../shared/dynamodb/operations/readPhone';
import readMessages from '../../shared/dynamodb/operations/readMessages';

import getProjection from './getProjection';

/* -------*/
/* MODELS */
/* -------*/

// const phoneType = new GraphQLObjectType({
//   name: 'Phone',
//   description: 'A phone.', // Inspired
//   fields: () => ({
//     id: {
//       type: GraphQLString,
//       description: 'The id (phone number) of the phone.',
//     },
//     messages: {
//       type: new GraphQLList(messageType),
//       description: 'The messages of the phone',
//       args: { // Arguments are for pagination only
//         before: {
//           description: 'Pagination createdAt in ms.',
//           type: GraphQLInt,
//           defaultValue: Date.now(), // before now
//         },
//         count: {
//           description: 'Pagination count.',
//           type: GraphQLInt,
//           defaultValue: 20, // last 20 messages by default
//         }
//       },
//       resolve: (phone, args, context) => readMessages(phone.id, args, getProjection(context)),
//     },
//   }),
// });

const messageType = new GraphQLObjectType({
  name: 'Message',
  description: 'A message (sms) and also a note.',
  fields: {
    id: {
      type: GraphQLString,
      description: 'The id of the message.',
    },
    sender: {
      type: GraphQLString,
      description: 'The sender of the message.',
    },
    receiver: {
      type: GraphQLString,
      description: 'The receiver of the message.',
    },
    content: {
      type: GraphQLString,
      description: 'The content of the message.',
    },
    createdAt: {
      type: GraphQLFloat ,
      description: 'The timestamp of the message.',
    },
  },
});

/* --------*/
/* QUERIES */
/* --------*/

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    
    readMessages: {
      description: 'Get messages from given phone number.',
      type: new GraphQLList(messageType),
      args: {
        sender: {
          description: 'cell number for messages.',
          type: new GraphQLNonNull(GraphQLString)
        },
        before: {
          description: 'Pagination createdAt in ms.',
          type: GraphQLFloat,
        },
        limit: {
          description: 'Pagination limit.',
          type: GraphQLInt,
          defaultValue: 20, // last 20 messages by default
        }
      },
      resolve: (root, args, context) => readMessages(args, getProjection(context)),
    },
    // readPhone query example:
    // { readPhone(number: \"33600000000\") { number, countryCode }  }
    // readPhone: {
    //   description: 'Get phone by cell number.',
    //   type: phoneType,
    //   args: {
    //     id: {
    //       description: 'cell number of the phone.',
    //       type: new GraphQLNonNull(GraphQLString)
    //     }
    //   },
    //   resolve: (root, { id }, context) => readPhone(id, getProjection(context)),
    // },
    // readPhone: {
    //   description: 'Get phone by cell number.',
    //   type: phoneType,
    //   args: {
    //     id: {
    //       description: 'cell number of the phone.',
    //       type: new GraphQLNonNull(GraphQLString)
    //     }
    //   },
    //   resolve: (root, { id }, context) => readPhone(id, getProjection(context)),
    // },
    // readUserByEmailOrUsername query example:
    // { readUserByUsername(username: \"coco75\") { id, username } }
    // readUserByUsername: {
    //   description: 'Get user by username.',
    //   type: userType,
    //   args: {
    //     username: {
    //       description: 'email or username of the user.',
    //       type: new GraphQLNonNull(GraphQLString)
    //     }
    //   },
    //   // resolve: (root, { emailOrUsername }, context) => readUserByEmailOrUsername(emailOrUsername, getProjection(context)),
    //   resolve: (root, { username }, context) => ({
    //     username,
    //     id: username + '_id',
    //   }),
    // },
  }
});

/* ----------*/
/* MUTATIONS */
/* ----------*/

// const mutationType = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
    
//     // createUser query example:
//     // mutation createUser { user: createUser (username: \"coco75\", password: \"12345678\", email: \"abc@mail.com\") { id, username, email } }
//     // createUser: {
//     //   type: userType,
//     //   description: 'Create a new user.',
//     //   args: {
//     //     username: {
//     //       type: new GraphQLLimitedString(3, 15, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-')
//     //     },
//     //     email: {
//     //       type: new GraphQLNonNull(GraphQLEmail)
//     //     },
//     //     password: {
//     //       type: new GraphQLLimitedString(8) // GraphQLPassword is overkill
//     //     },
//     //   },
//     //   resolve: (root, args) => createUser(args, root.sourceIp),
//     // }
//   }
// });


/* -------*/
/* SCHEMA */
/* -------*/

export default new GraphQLSchema({
  query: queryType,
  // mutation: mutationType,
});
