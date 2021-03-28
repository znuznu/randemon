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

  @media only screen and (min-width: 1660px) {
    grid-template-columns: repeat(3, 400px [col-start]);
  }
`;

type TeamProps = {
  team: Team;
};

const TeamSection = ({ team }: TeamProps) => {
  return (
    <Container>
      {team.pokemon.map((pokemon, index) => {
        return <Card key={pokemon.id} pokemon={pokemon} teamIndex={index} />;
      })}
    </Container>
  );
};

export default TeamSection;
