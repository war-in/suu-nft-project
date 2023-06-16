import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { CenteredDiv, StyledButton } from "../styles";
import { Event } from "../screens/AdminEventsPanel";
import { useEthereum } from "../EthereumContext";
import RankTile from "../components/RankTile";

interface TxResultData {
  title: string;
  contractAddress?: string;
  tokenId?: string;
  hash: string;
}

function EventDetails() {
  const [importTxData, setImportTxData] = useState<TxResultData>();
  const [ticketsNumber, setTicketsNumber] = useState(0);
  const [rankNumber, setRankNumber] = useState(-1);
  const [ranksAddresses, setRanksAddresses] = useState<string[]>([]);
  const [ranksPrices, setRanksPrices] = useState<string[]>([]);
  const [ranksNames, setRanksNames] = useState<string[]>([]);
  const location = useLocation();
  const { event }: { event: Event } = location.state;

  const { getCurrentRank, buyRank, getRanksInfoAsync, buyTickets } =
    useEthereum();

  const getAndSetCurrentRank = async () => {
    const rank = await getCurrentRank(event.ranksAddress);
    setRankNumber(rank);
  };

  const fetchRanksData = async () => {
    const { prices, names, addresses } = await getRanksInfoAsync(
      event.ranksAddress
    );
    setRanksPrices(prices);
    setRanksNames(names);
    setRanksAddresses(addresses);
  };

  useEffect(() => {
    getAndSetCurrentRank();
  }, []);

  useEffect(() => {
    fetchRanksData();
  }, [rankNumber]);

  const buyTicket = async () => {
    setImportTxData(undefined);
    const hash = await buyTickets(
      event.name,
      +event.ticketPricePerRank[rankNumber],
      ticketsNumber
    );
    if (hash) {
      setImportTxData({
        hash,
        title: `You bought ${ticketsNumber} ticket/s!`,
      });
    }
  };

  const purchaseRank = async () => {
    setImportTxData(undefined);
    const result = await buyRank(
      event.ranksAddress,
      ranksPrices[rankNumber],
      ranksAddresses[rankNumber],
      ranksAddresses[rankNumber - 1]
    );
    if (result) {
      await getAndSetCurrentRank();
      setImportTxData({
        tokenId: result.tokenId,
        contractAddress: ranksAddresses[rankNumber],
        hash: result.transactionHash,
        // title: `${ranksNames[rankNumber]} rank bought!`,
        title: `New rank bought!`,
      });
    }
  };

  return event ? (
    <CenteredDiv>
      <TitleText>Event name</TitleText>
      <DetailsText>{event.name}</DetailsText>
      <TitleText>Buy ticket </TitleText>
      <HorizontalDiv>
        <TitleText>Number of tickets: </TitleText>
        <StyledInput
          type="number"
          onChange={(number) => setTicketsNumber(Number(number.target.value))}
        />
        <StyledButton disabled={ticketsNumber <= 0} onClick={buyTicket}>
          Buy tickets
        </StyledButton>
      </HorizontalDiv>

      {importTxData && (
        <CenteredDiv>
          <TitleText>{importTxData.title}</TitleText>
          <DetailsText>Import your NFT to MetaMask</DetailsText>
          {importTxData.tokenId && (
            <>
              <TitleText>Token:</TitleText>
              <DetailsText>{importTxData.tokenId}</DetailsText>
            </>
          )}
          {importTxData.contractAddress && (
            <>
              <TitleText>Contract address:</TitleText>
              <DetailsText>{importTxData.contractAddress}</DetailsText>
            </>
          )}
        </CenteredDiv>
      )}
      <CenteredDiv>
        <TitleText>Your current rank: </TitleText>
        {rankNumber > 0 ? (
          <RankTile
            data={{
              saleStartTimePerRank: event.saleStartTimePerRank[rankNumber],
              maxTicketsPerUserPerRank:
                event.maxTicketsPerUserPerRank[rankNumber],
              ticketPricePerRank: event.ticketPricePerRank[rankNumber],
            }}
            rankName={ranksNames[rankNumber - 1]}
            rankPrice={ranksPrices[rankNumber - 1]}
          />
        ) : (
          <RankTile
            data={{
              saleStartTimePerRank: event.saleStartTimePerRank[rankNumber],
              maxTicketsPerUserPerRank:
                event.maxTicketsPerUserPerRank[rankNumber],
              ticketPricePerRank: event.ticketPricePerRank[rankNumber],
            }}
            rankName="Open sale"
          />
        )}
      </CenteredDiv>
      <TitleText>Possible ranks: </TitleText>
      <>
        {[...Array(event.ticketPricePerRank.length - rankNumber - 1)].map(
          (_, index) => {
            const rankIndex = index + rankNumber + 1;

            return (
              <RankTile
                key={index}
                data={{
                  saleStartTimePerRank: event.saleStartTimePerRank[rankIndex],
                  maxTicketsPerUserPerRank:
                    event.maxTicketsPerUserPerRank[rankIndex],
                  ticketPricePerRank: event.ticketPricePerRank[rankIndex],
                }}
                purchasable={index === 0}
                purchaseRank={purchaseRank}
                rankName={ranksNames[rankIndex - 1]}
                rankPrice={ranksPrices[rankIndex - 1]}
              />
            );
          }
        )}
      </>
    </CenteredDiv>
  ) : (
    <span>No event provided</span>
  );
}

const DetailsText = styled.span`
  font-family: "Lucida Console", "Courier New", monospace;
  font-size: xx-large;
  color: var(--text-color);
  font-weight: bold;
`;

const TitleText = styled.span`
  font-family: "Times New Roman", Times, serif;
  font-size: xx-large;
  color: var(--color-secondary);
  font-weight: bold;
`;

const HorizontalDiv = styled.div`
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  margin: 0;
  padding: 7px 8px;
  font-size: 14px;
  color: inherit;
  border: 1px solid #a39171;
  text-align: center;
  ::placeholder {
    color: black;
    font-weight: bold;
    text-align: center;
  }
`;

export default EventDetails;
