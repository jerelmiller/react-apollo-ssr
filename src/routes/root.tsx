import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Countries</h1>
      </header>
      <main className="App-main">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
