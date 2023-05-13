import styled from "styled-components";

export const CenteredDiv = styled.div`
  display: flex;
  padding: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledButton = styled.button`
  background-color: #a39171;
  margin: 20px;
  font-size: 30px;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  border-color: transparent;
  cursor: pointer;
  :disabled {
    background-color: #ebebe4;
  }
`;
