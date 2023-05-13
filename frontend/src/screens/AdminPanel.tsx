import { useForm } from "react-hook-form";
import styled from "styled-components";
import { CenteredDiv, StyledButton } from "../styles";

type FormInputs = {
  eventName: string;
  eventDescription: string;
  eventDate: string;
  eventTicketsNumber: number;
};

export interface Event {
  name: string;
  description: string;
  date: string;
  ticketsNumber: number;
}

function AdminPanel() {
  const { register, handleSubmit } = useForm<FormInputs>();

  const createEvent = async (event: Event) => {
    // TODO send request
    console.log(event);
  };

  const onSubmit = handleSubmit(
    async ({ eventName, eventDescription, eventDate, eventTicketsNumber }) => {
      const event: Event = {
        name: eventName,
        description: eventDescription,
        date: new Date(eventDate).toISOString(),
        ticketsNumber: eventTicketsNumber,
      };

      createEvent(event);
    }
  );

  return (
    <CenteredDiv>
      <StyledForm onSubmit={onSubmit}>
        <LabelText htmlFor="eventName">Event name</LabelText>
        <StyledInput
          type="text"
          className="form-control"
          placeholder="Event name"
          {...register("eventName")}
          required
        />
        <LabelText htmlFor="eventDescription">Event description</LabelText>
        <StyledInput
          className="form-control"
          placeholder="Event description"
          {...register("eventDescription")}
        />
        <LabelText htmlFor="eventDate"> Event date </LabelText>
        <StyledInput
          type="date"
          className="form-control"
          {...register("eventDate")}
          required
        />
        <LabelText htmlFor="eventTicketsNumber"> Number of tickets </LabelText>
        <StyledInput
          type="number"
          className="form-control"
          {...register("eventTicketsNumber")}
          required
        />
        <StyledButton type="submit">Save</StyledButton>
      </StyledForm>
    </CenteredDiv>
  );
}

const LabelText = styled.label`
  font-family: "Times New Roman", Times, serif;
  font-size: xx-large;
  color: var(--color-secondary);
`;

const StyledForm = styled.form`
  display: flex;
  height: 50%;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledInput = styled.input`
  background-color: #a39171;
  padding: 1rem 5rem;
  border-radius: 2rem;
  border-color: #a39171;
  color: white;
  &:focus::-webkit-datetime-edit {
    color: black;
  }
  ::placeholder {
    color: white;
    text-align: center;
  }
  ::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
  ::-webkit-datetime-edit {
    color: white;
  }
`;

export default AdminPanel;