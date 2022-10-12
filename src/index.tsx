import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createHttpLink, ApolloProvider, ApolloClient } from '@apollo/client';

import App from './App';
import cache from './cache';
import './index.css';

const client = new ApolloClient({
  connectToDevTools: true,
  link: createHttpLink({ uri: 'https://countries.trevorblades.com' }),
  cache: cache.restore((window as any).__APOLLO_STATE__),
});

hydrateRoot(
  document.getElementById('root')!,
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);
