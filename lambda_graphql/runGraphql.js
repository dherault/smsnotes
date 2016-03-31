import { graphql } from 'graphql';
import schema from './schema';
import { logFetch } from 'shared/utils/logger';

/* Runs a GraphQL query, returns a promise */
export default function runGraphql(query, sourceIp) {
  
  logFetch('-→', query);
  
  return graphql(schema, query, { sourceIp }).then(({ errors, data }) => {
    
    // On error, we must throw (--> context.fail --> APIG reply with statusCode !== 200) 
    if (errors) {
      const n = errors.length;
      logFetch(`←- ${n} error${n > 1 ? 's' : ''}:`);
      
      // We can throw only one error, but we can log all of them
      errors.forEach(({ originalError, message }) => console.log(originalError || message));
      
      throw JSON.stringify(errors[0].originalError || {
        statusCode: 400,
        message: errors[0].message,
      });
      
    } else {
      logFetch('←-', data);
      const dataKeys = Object.keys(data); // tsss...
      
      return dataKeys.length > 1 ? data : data[dataKeys[0]];
    }
  }); // Can graphql reject ? Bad docs...
}
