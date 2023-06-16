import { useForm } from "react-hook-form";
import styled from "styled-components";
import { CenteredDiv, StyledButton } from "../styles";
import { CreateEventRequest, useEthereum } from "../EthereumContext";
import { useEffect, useState } from "react";

type FormInputs = {
  ranksGroup: string;
  name: string;
  symbol: string;
  [key: `saleStartTime${number}`]: Date;
  [key: `maxTicketsPerUser${number}`]: number;
  [key: `ticketPrice${number}`]: number;
};

export interface Event {
  name: string;
  symbol: string;
  ranksAddress: string;
  saleStartTimePerRank: number[];
  maxTicketsPerUserPerRank: number[];
  ticketPricePerRank: number[];
}

function AdminEventsPanel() {
  const [ranksGroups, setRanksGroups] = useState<string[]>();
  const [numberOfRanks, setNumberOfRanks] = useState<number>(0);
  const [ranksAddress, setRanksAddress] = useState<string | null>(null);
  const [ranksNames, setRanksNames] = useState<string[]>([]);

  const { register, handleSubmit, reset } = useForm<FormInputs>();
  const {
    fetchRanksNames,
    getRanksContractAddress,
    getRanksNumber,
    createEvent,
    getRanksInfoAsync,
  } = useEthereum();

  const showRanksForm = handleSubmit(async ({ ranksGroup }) => {
    const rankAddress = await getRanksContractAddress(ranksGroup);
    setRanksAddress(rankAddress);
    const ranksNumber = await getRanksNumber(rankAddress);
    setNumberOfRanks(+ranksNumber);
  });

  useEffect(() => {
    fetchRanksNames().then((names) => setRanksGroups(names));
  }, []);

  const fetchRanksData = async () => {
    const { names } = await getRanksInfoAsync(ranksAddress!);
    setRanksNames(names);
  };

  useEffect(() => {
    fetchRanksData();
  }, [numberOfRanks]);

  const onSubmit = handleSubmit(async (values) => {
    const saleStartTimePerRank: number[] = [];
    const maxTicketsPerUserPerRank: number[] = [];
    const ticketPricePerRank: number[] = [];

    Object.keys(values).forEach((key) => {
      const index = +key.match(/\d+/)!;
      //@ts-ignore
      const value = values[key];

      if (key.includes("saleStartTime")) {
        saleStartTimePerRank[index] = new Date(value).getTime() / 1000;
      } else if (key.includes("maxTicketsPerUser")) {
        maxTicketsPerUserPerRank[index] = +value;
      } else if (key.includes("ticketPrice")) {
        ticketPricePerRank[index] = value;
      }
    });

    const event: CreateEventRequest = {
      ticketName: values.name,
      ticketSymbol: values.symbol,
      ranksAddress: ranksAddress!, // I shouldnt do it, but ...
      saleStartTimePerRank,
      maxTicketsPerUserPerRank,
      ticketPricePerRank,
    };

    reset();

    createEvent(event);
  });

  const RankPart = ({ index }: { index: number }) => {
    return (
      <CenteredDiv>
        <LabelText>{index < 1 ? "Open sale" : ranksNames[index - 1]}</LabelText>
        <CenteredDiv>
          <LabelText htmlFor="saleStartTime">Sale start time</LabelText>
          <StyledInput
            type="date"
            className="form-control"
            // placeholder="Symbol"
            {...register(`saleStartTime${index}`)}
            required
          />
          <LabelText htmlFor="maxTicketsPerUser">
            Max tickets per user
          </LabelText>
          <StyledInput
            type="number"
            className="form-control"
            // placeholder="Symbol"
            {...register(`maxTicketsPerUser${index}`)}
            required
          />
          <LabelText htmlFor="ticketPrice">Ticket price</LabelText>
          <StyledInput
            type="number"
            className="form-control"
            {...register(`ticketPrice${index}`)}
            required
          />
        </CenteredDiv>
      </CenteredDiv>
    );
  };

  return (
    <CenteredDiv>
      <StyledForm onSubmit={showRanksForm}>
        <LabelText htmlFor="ranksGroup">Ranks group</LabelText>
        <StyledSelect
          className="form-control"
          {...register("ranksGroup", { required: true })}
        >
          {ranksGroups?.map((group, index) => (
            <option key={index} value={group}>
              {group}
            </option>
          ))}
        </StyledSelect>
        <LabelText htmlFor="name">Event name</LabelText>
        <StyledInput
          type="text"
          className="form-control"
          // placeholder="Event name"
          {...register("name")}
          required
        />
        <LabelText htmlFor="symbol">Event symbol</LabelText>
        <StyledInput
          type="text"
          className="form-control"
          // placeholder="Event description"
          {...register("symbol")}
        />
        <StyledButton type="submit">Set</StyledButton>
      </StyledForm>
      <StyledForm onSubmit={onSubmit}>
        {numberOfRanks > 0 &&
          [...Array(numberOfRanks + 1)].map((_, index) => (
            <RankPart key={index} index={index} />
          ))}
        {numberOfRanks > 0 && <StyledButton type="submit">Create</StyledButton>}
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

const StyledSelect = styled.select`
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

export default AdminEventsPanel;
