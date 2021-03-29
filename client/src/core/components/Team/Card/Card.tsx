import React, { useContext } from 'react';
import styled from 'styled-components';

import { Context as TeamContext } from '../../../contexts/teamContext';

import Pokemon from '../../../models/pokemon';
import PokemonDetail from './PokemonDetail';
import Moves from './Moves/Moves';
import SkeletonDetail from './SkeletonDetail';
import SkeletonMoves from './SkeletonMoves';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 0.25rem;
  padding: 0.8rem;

  @media only screen and (max-width: 895px) {
    flex-direction: row;
  }
`;

type CardProps = {
  pokemon: Pokemon;
  teamIndex: number;
};

const Card = ({ pokemon, teamIndex }: CardProps) => {
  const teamContext = useContext(TeamContext);

  return (
    <Container>
      {!pokemon.isLocked && teamContext.isLoading ? (
        <>
          <SkeletonDetail />
          <SkeletonMoves />
        </>
      ) : (
        <>
          <PokemonDetail pokemon={pokemon} teamIndex={teamIndex} />
          <Moves moves={pokemon.moves}></Moves>
        </>
      )}
    </Container>
  );
};

export default Card;
