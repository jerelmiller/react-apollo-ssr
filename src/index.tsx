import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createHttpLink, ApolloProvider, ApolloClient } from '@apollo/client';

import App from './App';
import cache from './cache';
import './index.css';

const client = new ApolloClient({
  link: createHttpLink({ uri: 'https://countries.trevorblades.com' }),
  cache,
});

hydrateRoot(
  document,
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App assets={(window as any)['assetManifest']} />
    </ApolloProvider>
  </BrowserRouter>
);
