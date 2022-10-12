import Html from './Html';

interface AppProps {
  assets: Record<string, string>;
}

const App = ({ assets }: AppProps) => {
  return (
    <Html assets={assets}>
      <div className="App">
        <header className="App-header">
          <h1>Countries</h1>
        </header>
        <main className="App-main">This is some stuff</main>
      </div>
    </Html>
  );
};

export default App;
