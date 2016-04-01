import 'babel-polyfill'; // node v0.10... What were they thinking?!!!
import runGraphql from './lib/runGraphql';

export default ({ payload, sourceIp }) => payload && typeof payload.query === 'string' ?
  runGraphql(payload.query, sourceIp) :
  Promise.reject(JSON.stringify({
    statusCode: 400,
    message: "missing or invalid 'query' key in payload"
  }));
