import isPlainObject from 'lodash.isplainobject';

// Deserializes a DynamoDB result
export default function deserialize(obj) {
  
  if (Array.isArray(obj)) return obj.map(deserialize);
  
  else if (isPlainObject(obj)) {
    const result = {};
    
    for (let key in obj) {
      // console.log('processing key', key);
      
      const subKey = obj[key];
      if (!isPlainObject(subKey)) throw new Error(`Unimplemented in deserialize`);
      
      // Extracts the first key of obj[key]
      let type;
      for (type in subKey) {
        break;
      }
      
      // const value = subKey[type];
      // console.log('Type is', type, 'value is', value);
      
      switch (type) {
        case 'S':
          result[key] = subKey[type];
          break;
          
        case 'N':
          result[key] = parseFloat(subKey[type]);
          break;
        
        default:
          throw new Error(`Unimplemented type in deserialize: ${type}`);
      }
    }
    
    return result;
  }
  
  return obj;
}

// const test = deserialize([{ 
//   id: { S: '7977276621386409' },
//   createdAt: { N: '1459696130068' } 
// },{ 
//   id: { S: '7977276621386409' },
//   createdAt: { N: '1459696130068' } 
// },

// ]);

// console.log(test);
