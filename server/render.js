import App from '../src/App';
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
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="shortcut icon" href="favicon.ico" />
    <link rel="stylesheet" href="${assets['main.css']}" />
    <title>React Apollo SSR</title>
  </head>
  <body>
    <noscript>
      <b>Enable JavaScript to run this app.</b>
    </noscript>
    <div id="root">${content}</div>
    <script>
window.assetManifest = ${JSON.stringify(assets)};
window.__APOLLO_STATE__ = ${JSON.stringify(client.extract()).replace(
        /</g,
        '\\u003c'
      )};
    </script>
    <script type="text/javascript" src="${assets['main.js']}" />
  </body>
</html>
`
    );
    res.end();
  });
}
