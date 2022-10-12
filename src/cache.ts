import { InMemoryCache } from '@apollo/client';

export default new InMemoryCache({
  typePolicies: {
    Country: {
      keyFields: ['code'],
    },
    Language: {
      keyFields: ['code'],
    },
    State: {
      keyFields: ['name'],
    },
  },
});
