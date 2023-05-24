import React from "react";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { useEthereum } from "../EthereumContext";

function Header() {
  const { walletAddress } = useEthereum();

  const customerTabs = walletAddress ? ["/events"] : [];
  const adminTabs =
    walletAddress === process.env.REACT_APP_ADMIN_WALLET_ADDRESS
      ? ["/create-ranks", "/create-event"]
      : [];
  const allTabs = ["/home", ...adminTabs, ...customerTabs];

  return (
    <StyledHeader>
      {allTabs.map((path) => {
        return <NavEntry path={path} key={path} />;
      })}
    </StyledHeader>
  );
}

export const NavEntry = ({ path }: { path: string }) => {
  const match = useMatch(path);

  return (
    <Link to={path}>
      <StyledEntry isActive={Boolean(match)}>{path} </StyledEntry>
    </Link>
  );
};

export const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  padding: 0.7rem 0rem;
  background-color: white;
  border-radius: 2rem;
`;

interface EntryProps {
  readonly isActive: boolean;
}

export const StyledEntry = styled.a<EntryProps>`
  text-decoration: none;
  background-color: white;
  margin: 0 0 0 2rem;
  padding: 1rem 2rem;
  border-radius: 2rem;
  color: #646e68;
  border-color: transparent;
  ${({ isActive }) =>
    isActive &&
    `
    color: white;
    background-color: #6d4c3d;
  `}
  &:hover {
    color: white;
    background-color: #6d4c3d;
  }
`;

export default Header;
