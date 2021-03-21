import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Pokemon from '../../../models/pokemon';
import PokemonDetail from './PokemonDetail';
import Moves from './Moves/Moves';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 0.25rem;
  padding: 0.8rem;
`;

type CardProps = {
  pokemon: Pokemon;
};

const Card = ({ pokemon }: CardProps) => {
  return (
    <Container>
      <PokemonDetail pokemon={pokemon} />
      <Moves moves={pokemon.moves}></Moves>
    </Container>
  );
};

export default Card;
