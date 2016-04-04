import 'babel-polyfill'; // node v0.10... What were they thinking?!!!
import runGraphql from '../lib/graphql/runGraphql';
import ApigError from '../lib/ApigError';

export default ({ payload, sourceIp }) => payload && typeof payload.query === 'string' ?
  runGraphql(payload.query, sourceIp) :
  Promise.reject(new ApigError(400, "missing or invalid 'query' key in payload"));
