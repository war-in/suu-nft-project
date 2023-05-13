import React, { useEffect, useState } from "react";
import NoEthProvider from "../components/NoEthProvider";
import { useEthereum } from "../EthereumContext";
import { CenteredDiv } from "../styles";

function HomeScreen() {
  const { connectWallet, getWalletAddress } = useEthereum();
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const getAndSetWalletAddress = async () => {
      const address = await getWalletAddress();
      console.log(address);

      setWalletAddress(address);
    };
    getAndSetWalletAddress();
  });

  return (
    <CenteredDiv>
      {window.ethereum === undefined ? (
        <NoEthProvider />
      ) : (
        <div>
          <button onClick={connectWallet}>Connect a wallet</button>
          <p>Your wallet address {walletAddress}</p>
        </div>
      )}
    </CenteredDiv>
  );
}

export default HomeScreen;
