import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { CenteredDiv, StyledButton } from "../styles";
import { getDateFormated } from "../utils/date";

function EventDetails() {
  const [ticketsNumber, setTicketsNumber] = useState(0);
  const location = useLocation();
  const { event } = location.state;

  const buyTicket = () => {
    // TODO request "ticketsNumber" tickets
    console.log(ticketsNumber);
  };

  return event ? (
    <CenteredDiv>
      <TitleText>Campaign name</TitleText>
      <DetailsText>{event.name}</DetailsText>
      <TitleText>Description</TitleText>
      <DetailsText>{event.description}</DetailsText>
      <TitleText>Duration</TitleText>
      <DetailsText>Date: {getDateFormated(new Date(event.date))}</DetailsText>
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
