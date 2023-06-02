import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EventCard from "../components/EventCard";
import { CenteredDiv } from "../styles";
import { Event } from "./AdminEventsPanel";
import { useEthereum } from "../EthereumContext";

function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  const { fetchEvents } = useEthereum();

  const fetchEventsAsync = async () => {
    const result = await fetchEvents();
    setEvents(result);
  };

  useEffect(() => {
    fetchEventsAsync();
  }, []);

  return (
    <CenteredDiv>
      <EventsContainer>
        {events.map((event) => (
          <EventCard event={event} key={event.name} />
        ))}
      </EventsContainer>
    </CenteredDiv>
  );
}

const EventsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export default EventsPage;
