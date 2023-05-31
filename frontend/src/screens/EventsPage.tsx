import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EventCard from "../components/EventCard";
import { CenteredDiv } from "../styles";
import { Event } from "./AdminEventsPanel";
import { useEthereum } from "../EthereumContext";

function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  const { fetchEvents, createTestTicketContract } = useEthereum();

  const fetchEventsAsync = async () => {
    const result = await fetchEvents();
    setEvents(result);
  };

  useEffect(() => {
    fetchEventsAsync();
  }, []);

  const onTmpButtonPress = () => {
    createTestTicketContract([
      "Event 1",
      "EVT1",
      "0x1021d9c58a0D94F1Daa10e0BfD39B7420555b841".toLowerCase(),
      [1685558292, 1685558292],
      [2, 3],
      [5, 10],
    ]);
  };

  return (
    <CenteredDiv>
      <EventsContainer>
        {events.map((event) => (
          <EventCard event={event} key={event.name} />
        ))}
      </EventsContainer>
      <button onClick={onTmpButtonPress}>Create test contract</button>
    </CenteredDiv>
  );
}

const EventsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export default EventsPage;
