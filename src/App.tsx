import { Routes, Route } from 'react-router-dom';
import Root from './routes/root';
import Index from './routes/index';
import Country from './routes/country';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Index />} />
        <Route path="/countries/:code" element={<Country />} />
      </Route>
    </Routes>
  );
};

export default App;
