import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Event } from "../screens/AdminEventsPanel";
import { getDateFormated } from "../utils/date";

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
      <StyledName>{props.event.name}</StyledName>
      <StyledDate>
        Date: <br />
        {getDateFormated(new Date(props.event.date))}
      </StyledDate>
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
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
`;

const StyledName = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: white;
  text-align: center;
`;

const StyledDate = styled.div`
  font-size: 15px;
  color: #dcc9b6;
  text-align: center;
`;

export default EventCard;
