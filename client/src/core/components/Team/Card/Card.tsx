import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Pokemon from '../../../models/pokemon';
import PokemonDetail from './PokemonDetail';
import Moves from './Moves/Moves';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.06); */
  border: 1px solid black;
  padding: 0.8rem;
`;

const Divider = styled.hr`
  width: 100%;
  margin: 1rem 0;
  opacity: 1;
  color: black;
  background-color: black;
  background: black;
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
