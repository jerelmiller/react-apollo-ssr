import { Routes, Route } from 'react-router-dom';
import Html from './Html';
import Root from './routes/root';
import Index from './routes/index';
import Country from './routes/country';

interface AppProps {
  assets: Record<string, string>;
}

const App = ({ assets }: AppProps) => {
  return (
    <Html assets={assets}>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Index />} />
          <Route path="/countries/:code" element={<Country />} />
        </Route>
      </Routes>
    </Html>
  );
};

export default App;
