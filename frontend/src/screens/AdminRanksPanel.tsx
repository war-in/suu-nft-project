import { useForm } from "react-hook-form";
import styled from "styled-components";
import { CenteredDiv, StyledButton } from "../styles";
import { useEthereum } from "../EthereumContext";
import { useState } from "react";

type FormInputs = {
  [key: string]: any; /// I need repeatable keys
};

function AdminRanksPanel() {
  const [numberOfRanks, setNumberOfRanks] = useState<number>(0);
  const [contractName, setContractName] = useState("");

  const { createRanks } = useEthereum();

  const { register, handleSubmit, reset } = useForm<FormInputs>();

  const showRanksForm = handleSubmit(({ ranksNumber, contract }) => {
    setContractName(contract);
    setNumberOfRanks(+ranksNumber);
  });

  const onSubmit = handleSubmit(async (values) => {
    const ranksNames: string[] = [];
    const ranksPrices: number[] = [];
    const ranksSymbols: string[] = [];

    Object.keys(values).forEach((key) => {
      const index = +key.match(/\d+/)!;
      const value = values[key];

      if (key.includes("rankName")) {
        ranksNames[index] = value;
      } else if (key.includes("rankPrice")) {
        ranksPrices[index] = +value;
      } else if (key.includes("rankSymbol")) {
        ranksSymbols[index] = value;
      }
    });

    reset();

    await createRanks({
      name: contractName,
      numberOfRanks,
      ranksNames,
      ranksSymbols,
      ranksPrices,
    });
  });

  const RankPart = ({ index }: { index: number }) => {
    return (
      <CenteredDiv>
        <LabelText htmlFor="rankName">Rank name</LabelText>
        <StyledInput
          type="text"
          className="form-control"
          placeholder="Name"
          {...register(`rankName${index}`)}
          required
        />
        <LabelText htmlFor="rankSymbol">Rank symbol</LabelText>
        <StyledInput
          type="text"
          className="form-control"
          placeholder="Symbol"
          {...register(`rankSymbol${index}`)}
          required
        />
        <LabelText htmlFor="rankPrice">Rank price</LabelText>
        <StyledInput
          type="number"
          className="form-control"
          {...register(`rankPrice${index}`)}
          required
        />
      </CenteredDiv>
    );
  };

  return (
    <CenteredDiv>
      <StyledForm onSubmit={showRanksForm}>
        <LabelText htmlFor="contract">Contract name</LabelText>
        <StyledInput
          type="text"
          className="form-control"
          {...register("contract")}
          required
        />
        <LabelText htmlFor="ranksNumber">Number of ranks</LabelText>
        <StyledInput
          type="number"
          className="form-control"
          {...register("ranksNumber")}
          required
        />
        <StyledButton type="submit">Set</StyledButton>
      </StyledForm>
      <StyledForm onSubmit={onSubmit}>
        {[...Array(numberOfRanks)].map((_, index) => (
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

export default AdminRanksPanel;
