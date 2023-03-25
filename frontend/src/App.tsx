import React, { useEffect, useState } from 'react';
import NoEthProvider from './components/NoEthProvider';
import { useEthereum } from './EthereumContext';

function App() {
  const { connectWallet, getWalletAddress } = useEthereum();
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    const getAndSetWalletAddress = async () => {
      const address = await getWalletAddress();
      setWalletAddress(address);
    }
    getAndSetWalletAddress();
  })

  return (
    <>
      { 
        window.ethereum === undefined 
        ? <NoEthProvider /> 
        : <div>
            <button onClick={connectWallet}>Connect a wallet</button>
            <p>Your wallet address {walletAddress}</p>
          </div> 
      }
    </>
  );
}

export default App;
