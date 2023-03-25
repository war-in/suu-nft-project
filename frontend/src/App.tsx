import React from 'react';
import NoEthProvider from './components/NoEthProvider';

function App() {
  return (
    <>{ window.ethereum === undefined ? (<NoEthProvider />) : (<p>Routes</p>) }</>
  );
}

export default App;
