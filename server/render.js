import { renderToPipeableStream } from 'react-dom/server';
import App from '../src/App';
import { ApolloProvider, ApolloClient, createHttpLink } from '@apollo/client';
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
  let didError = false;
  const stream = renderToPipeableStream(
    <StaticRouter location={url}>
      <ApolloProvider client={client}>
        <App assets={assets} />
      </ApolloProvider>
    </StaticRouter>,
    {
      bootstrapScripts: [assets['main.js']],
      onShellReady() {
        // If something errored before we started streaming, we set the error code appropriately.
        res.statusCode = didError ? 500 : 200;
        res.setHeader('Content-type', 'text/html');
        stream.pipe(res);
      },
      onError(x) {
        didError = true;
        console.error(x);
      },
    }
  );
  // Abandon and switch to client rendering if enough time passes.
  // Try lowering this to see the client recover.
  // setTimeout(() => stream.abort(), ABORT_DELAY);
}
