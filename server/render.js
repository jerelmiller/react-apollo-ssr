import App from '../src/App';
import Html from '../src/Html';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ApolloProvider, ApolloClient, createHttpLink } from '@apollo/client';
import {
  getDataFromTree,
  renderToStringWithData,
} from '@apollo/client/react/ssr';
import { StaticRouter } from 'react-router-dom/server';
import cache from '../src/cache';

// In a real setup, you'd read it from webpack build stats.
const assets = {
  'main.js': '/client/main.js',
  'main.css': '/client/main.css',
};

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({ uri: 'https://countries.trevorblades.com' }),
  cache,
});

export default function render(url, res) {
  res.socket.on('error', (error) => {
    console.error('Fatal', error);
  });

  renderToStringWithData(
    <StaticRouter location={url}>
      <ApolloProvider client={client}>
        <App assets={assets} />
      </ApolloProvider>
    </StaticRouter>
  ).then((content) => {
    res.status(200);
    res.setHeader('Content-type', 'text/html');
    res.send(
      renderToString(
        <Html
          assets={assets}
          content={content}
          initialState={client.extract()}
        />
      )
    );
    res.end();
  });
}
