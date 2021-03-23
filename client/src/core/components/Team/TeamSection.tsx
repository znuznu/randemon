import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Team } from '../../models/team';
import Card from './Card/Card';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 400px [col-start]);
  column-gap: 16px;
  row-gap: 16px;
  margin: auto;
  width: 1232px;
  padding-bottom: 2rem;
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
