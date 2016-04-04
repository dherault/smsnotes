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
      supported: true,
      name: 'France',
      fullName: 'France',
      receiver: '+33644631110',
      humanFriendlyReceiver: '06 44 63 11 10',
      internationnalCallingCode: '33',
      trunkPrefix: '0', 
      nationalSignificantNumbers: [9],
    },
    {
      supported: false,
      name: 'UK',
      fullName: 'United Kingdom',
      receiver: '',
      humanFriendlyReceiver: '',
      internationnalCallingCode: '44',
      trunkPrefix: '0', 
      prefixedNationalSignificantNumbers: [10],
    },
    {
      supported: false,
      name: 'Germany',
      fullName: 'Germany',
      receiver: '',
      humanFriendlyReceiver: '',
      internationnalCallingCode: '49',
      trunkPrefix: '0', 
      prefixedNationalSignificantNumbers: [10, 11],
    },
    /* NORTH AMERICA */
    {
      supported: false,
      name: 'USA',
      fullName: 'United States of America',
      receiver: '',
      humanFriendlyReceiver: '',
      internationnalCallingCode: '1',
      trunkPrefix: '1', 
      prefixedNationalSignificantNumbers: [10],
    },
    {
      supported: false,
      name: 'Canada',
      fullName: 'Canada',
      receiver: '',
      humanFriendlyReceiver: '',
      internationnalCallingCode: '1',
      trunkPrefix: '1', 
      prefixedNationalSignificantNumbers: [10],
    },
  ].sort((a, b) => a.fullName > b.fullName ? 1 : -1),
};
