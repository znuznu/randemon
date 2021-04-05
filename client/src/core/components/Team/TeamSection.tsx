import React from 'react';
import styled from 'styled-components';

import { Team } from '../../models/team';
import Card from './Card/Card';

const Container = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 400px [col-start]);
  column-gap: 16px;
  row-gap: 16px;
  margin: auto;
  padding-bottom: 2rem;

  @media only screen and (min-width: ${(props) => props.theme.breakpoints.xl}px) {
    grid-template-columns: repeat(3, 400px [col-start]);
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.m}px) {
    grid-template-columns: repeat(1, auto [col-start]);
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.s}px) {
    display: flex;
    flex-direction: column;
  }
`;

const Warning = styled.p`
  font-family: 'Lato';
  text-align: center;
`;

type TeamProps = {
  team: Team;
};

const TeamSection = ({ team }: TeamProps) => {
  return team.pokemon.length ? (
    <Container>
      {team.pokemon.map((pokemon, index) => {
        return <Card key={pokemon.id} pokemon={pokemon} teamIndex={index} />;
      })}
    </Container>
  ) : (
    <Warning>No pokemon found with the selected options.</Warning>
  );
};

export default TeamSection;
