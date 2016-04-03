import {
  // GraphQLEnumType,
  // GraphQLInterfaceType,
  GraphQLObjectType,
  // GraphQLList,
  // GraphQLInt,
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

import readPhone from '../../shared/dynamodb/operations/readPhone';

import getProjection from './getProjection';

/* -------*/
/* MODELS */
/* -------*/

// const userType = new GraphQLObjectType({
//   name: 'User',
//   description: 'A user.', // Inspired
//   fields: {
//     id: {
//       type: GraphQLString,
//       description: 'The id of the user.',
//     },
//     username: {
//       type: GraphQLString,
//       description: 'The username of the user.',
//     },
//     telephoneNumber: {
//       type: GraphQLString,
//       description: 'The telephone number of the user.',
//     },
//     email: {
//       type: GraphQLString,
//       description: 'The email of the user.',
//     },
//     passwordDigest: { // For dev purposes only
//       type: GraphQLString,
//       description: 'The digested password of the user.',
//     },
//     isVerified: {
//       type: GraphQLBoolean,
//       description: "Indicates if the user's email has been verified.",
//     },
//     createdAt: { // For dev purposes only
//       type: GraphQLInt,
//       description: 'JavaScript date of creation.',
//     },
//     updatedAt: { // For dev purposes only
//       type: GraphQLInt,
//       description: 'JavaScript date of update.',
//     },
//   },
// });
const phoneType = new GraphQLObjectType({
  name: 'Phone',
  description: 'A phone.', // Inspired
  fields: {
    id: {
      type: GraphQLString,
      description: 'The id (phone number) of the phone.',
    },
  },
});

/* --------*/
/* QUERIES */
/* --------*/

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    
    // readPhone query example:
    // { readPhone(number: \"33600000000\") { number, countryCode }  }
    readPhone: {
      description: 'Get phone by cell number.',
      type: phoneType,
      args: {
        id: {
          description: 'cell number of the phone.',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, { id }, context) => readPhone(id, getProjection(context)),
    },
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
