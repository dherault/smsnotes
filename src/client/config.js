export default {
  graphqlEndpointUrl: process.env.NODE_ENV === 'development' ?
    'http://localhost:3000/dev/graphql' :
    'https://hwwatd3ey3.execute-api.eu-central-1.amazonaws.com/dev/graphql',
  // https://en.wikipedia.org/wiki/List_of_mobile_phone_number_series_by_country
  // https://en.wikipedia.org/wiki/Telephone_numbering_plan
  // https://en.wikipedia.org/wiki/Trunk_prefix
  supportedCountries: [
    /* EUROPE */
    {
      name: 'France',
      receiver: '+33644631110',
      humanFriendlyReceiver: '06 44 63 11 10',
    },
  ].sort((a, b) => a.fullName > b.fullName ? 1 : -1),
};
