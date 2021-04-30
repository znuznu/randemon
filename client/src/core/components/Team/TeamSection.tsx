import React from 'react';
import styled from 'styled-components';

import { Team } from '../../models/team';
import Warning from '../commons/styles/Warning';
import SmallCard from '../SmallCard/SmallCard';

const Container = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, auto [col-start]);
  column-gap: 16px;
  row-gap: 16px;
  margin: auto;
  padding-bottom: 2rem;

  @media only screen and (min-width: ${(props) => props.theme.breakpoints.xl}px) {
    grid-template-columns: repeat(3, auto [col-start]);
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.m}px) {
    grid-template-columns: repeat(3, auto [col-start]);
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.s}px) {
    grid-template-columns: repeat(2, auto [col-start]);
    column-gap: 8px;
    row-gap: 8px;
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    grid-template-columns: repeat(2, auto [col-start]);
    column-gap: 8px;
    row-gap: 8px;
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xxs}px) {
    grid-template-columns: repeat(1, auto [col-start]);
  }
`;

type TeamProps = {
  team: Team;
};

const TeamSection = ({ team }: TeamProps) => {
  return team.pokemon.length ? (
    <Container>
      {team.pokemon.map((pokemon, index) => {
        return <SmallCard key={pokemon.id} pokemon={pokemon} teamIndex={index} />;
      })}
    </Container>
  ) : (
    <Warning>No pokemon found with the selected options.</Warning>
  );
};

export default TeamSection;
