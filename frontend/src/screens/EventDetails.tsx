import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { CenteredDiv, StyledButton } from "../styles";
import { Event } from "../screens/AdminEventsPanel";
import { useEthereum } from "../EthereumContext";
import RankTile from "../components/RankTile";

function EventDetails() {
  const [ticketsNumber, setTicketsNumber] = useState(0);
  const [rankNumber, setRankNumber] = useState(-1);
  const [ranksPrices, setRanksPrices] = useState<string[]>([]);
  const [ranksNames, setRanksNames] = useState<string[]>([]);
  const location = useLocation();
  const { event }: { event: Event } = location.state;

  const { getCurrentRank, buyRank, getRanksInfoAsync } = useEthereum();

  const getAndSetCurrentRank = async () => {
    const rank = await getCurrentRank(event.ranksAddress);
    setRankNumber(rank);
  };

  const fetchRanksData = async () => {
    const { prices, names } = await getRanksInfoAsync(event.ranksAddress);
    setRanksPrices(prices);
    setRanksNames(names);
  };

  useEffect(() => {
    getAndSetCurrentRank();
  }, []);

  useEffect(() => {
    fetchRanksData();
  }, [rankNumber]);

  const buyTicket = () => {
    // TODO request "ticketsNumber" tickets
    console.log(ticketsNumber);
  };

  const purchaseRank = async () => {
    await buyRank(event.ranksAddress, ranksPrices[rankNumber]);
    await getAndSetCurrentRank();
  };

  return event ? (
    <CenteredDiv>
      <TitleText>Campaign name</TitleText>
      <DetailsText>{event.name}</DetailsText>
      <TitleText>Buy ticket: </TitleText>
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

      <CenteredDiv>
        <TitleText>Your current rank: </TitleText>
        {rankNumber > 0 ? (
          <RankTile
            data={{
              saleStartTimePerRank: event.saleStartTimePerRank[rankNumber - 1],
              maxTicketsPerUserPerRank:
                event.maxTicketsPerUserPerRank[rankNumber - 1],
              ticketPricePerRank: event.ticketPricePerRank[rankNumber - 1],
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
