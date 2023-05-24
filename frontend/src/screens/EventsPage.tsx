import React from "react";
import styled from "styled-components";
import EventCard from "../components/EventCard";
import { CenteredDiv } from "../styles";
import { Event } from "./AdminEventsPanel";

const events: Event[] = [
  {
    name: "Koncert 1",
    description: "Opis 1",
    date: new Date().toISOString(),
    ticketsNumber: 1000,
    ranksGroup: "mock",
  },
  {
    name: "Koncert 2",
    description: "Opis 2",
    date: new Date().toISOString(),
    ticketsNumber: 500,
    ranksGroup: "mock",
  },
];

function EventsPage() {
  // TODO get events from backend
  //   const [events, setEvents] = useState<Event[]>([]);

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
