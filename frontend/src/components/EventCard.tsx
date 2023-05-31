import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Event } from "../screens/AdminEventsPanel";

type Props = {
  event: Event;
};

function EventCard(props: Props) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/event-details", {
      state: {
        event: props.event,
      },
    });
  };

  return (
    <VerticalContainer onClick={onClick}>
      <StyledName>{`name: ${props.event.name}`}</StyledName>
      <StyledText>{`symbol: ${props.event.symbol}`}</StyledText>
      <StyledText>{`ranks: ${props.event.ranksAddress.substring(
        0,
        8
      )}...`}</StyledText>
      {/* <StyledDate> TOOD: USE PROPER DATES FROM ARRAY
        Date: <br />
        {getDateFormated(new Date(props.event.date))}
      </StyledDate> */}
    </VerticalContainer>
  );
}

const VerticalContainer = styled.div`
  width: 170px;
  height: 190px;
  margin: 20px;
  display: flex;
  padding: 20px;
  background-color: #6d4c3d;
  border-radius: 0.7rem;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
`;

const StyledName = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: white;
  text-align: center;
`;

const StyledText = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: #bbb;
  text-align: center;
`;

const StyledDate = styled.div`
  font-size: 15px;
  color: #dcc9b6;
  text-align: center;
`;

export default EventCard;
