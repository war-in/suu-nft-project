import React from "react";
import NoEthProvider from "../components/NoEthProvider";
import { useEthereum } from "../EthereumContext";
import { CenteredDiv } from "../styles";

interface Props {
  walletAddress?: string;
}

const HomeScreen: React.FC<Props> = ({ walletAddress }) => {
  const { connectWallet } = useEthereum();

  return (
    <CenteredDiv>
      {window.ethereum === undefined ? (
        <NoEthProvider />
      ) : (
        <CenteredDiv>
          <button onClick={connectWallet}>Connect a wallet</button>
          {!!walletAddress && <p>Your wallet address {walletAddress}</p>}
        </CenteredDiv>
      )}
    </CenteredDiv>
  );
};

export default HomeScreen;
