// Inspired by https://github.com/graphql/graphql-js/issues/96
// Adapted for Dynamodb

export default function getProjection(context) {
  
  return (Array.isArray(context.fieldASTs) ? context.fieldASTs : [context.fieldASTs])
    .map(x => x.selectionSet.selections)
    .reduce((a, b) => a.concat(b), [])
    .map(({ kind, name }) => {
      switch (kind) {
        case 'Field' :
          return name.value;
          /* TO BE IMPLEMENTED */
          case 'InlineFragment':
            throw new Error('Implement me!');
          case 'FragmentSpread': // ! see issue
            throw new Error('Implement me!');
        default: 
          throw new Error('Unsuported query selection');
      }
    })
    .join(', ');
}
