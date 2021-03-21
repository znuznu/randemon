import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Pokemon from '../../../models/pokemon';
import PokemonDetail from './PokemonDetail';
import Moves from './Moves/Moves';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 3px solid black;
  border-radius: 0.25rem;
  padding: 0.8rem;
`;

const Divider = styled.hr`
  width: 100%;
  margin: 1rem 0;
  opacity: 1;
  color: black;
  border: 1px solid black;
`;

type CardProps = {
  pokemon: Pokemon;
};

const Card = ({ pokemon }: CardProps) => {
  return (
    <Container>
      <PokemonDetail pokemon={pokemon} />
      <Divider />
      <Moves moves={pokemon.moves}></Moves>
    </Container>
  );
};

export default Card;
