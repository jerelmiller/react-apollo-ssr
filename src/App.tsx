import Html from './Html';

interface AppProps {
  assets: Record<string, string>;
}

const App = ({ assets }: AppProps) => {
  return <Html assets={assets}>App</Html>;
};

export default App;
