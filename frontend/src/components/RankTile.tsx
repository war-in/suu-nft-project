import styled from "styled-components";
import { getDateFormatted } from "../utils/date";
import { CenteredDiv } from "../styles";

interface RankDetails {
  saleStartTimePerRank: number;
  maxTicketsPerUserPerRank: number;
  ticketPricePerRank: number;
}

interface Props {
  data: RankDetails;
  index: number;
}

const RankTile: React.FC<Props> = ({ data, index }) => {
  return (
    <CenteredDiv>
      <TitleText>Rank {index}</TitleText>
      <HeadingText>Price</HeadingText>
      <DetailsText>{data.ticketPricePerRank} ETH</DetailsText>
      <HeadingText>Start sale time</HeadingText>
      <DetailsText>
        {getDateFormatted(new Date(+data.saleStartTimePerRank))}
      </DetailsText>
      <HeadingText>Ticket limit per rank</HeadingText>
      <DetailsText>{data.maxTicketsPerUserPerRank}</DetailsText>
    </CenteredDiv>
  );
};

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

const HeadingText = styled.span`
  font-family: "Times New Roman", Times, serif;
  font-size: x-large;
  color: var(--color-secondary);
  font-weight: 500;
  margin: 16px 0px;
`;

export default RankTile;