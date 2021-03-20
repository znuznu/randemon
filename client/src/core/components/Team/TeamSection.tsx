import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Team } from '../../models/team';
import Card from './Card/Card';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 2rem;
`;

type TeamProps = {
  team: Team;
};

const TeamSection = ({ team }: TeamProps) => {
  return (
    <Container>
      {team.pokemon.map((pokemon) => {
        return <Card key={pokemon.id} pokemon={pokemon} />;
      })}
    </Container>
  );
};

export default TeamSection;
