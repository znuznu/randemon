import React, { useContext } from 'react';

import styled from 'styled-components';

import { Context as TeamContext } from '../../../contexts/teamContext';
import useWindowSize from '../../../hooks/useWindowSize';
import { breakpoints } from '../../../../styles/theme/breakpoints';
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

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.m}px) {
    flex-direction: row;
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.s}px) {
    flex-direction: column;
  }
`;

type CardProps = {
  pokemon: Pokemon;
  teamIndex: number;
};

const Card = ({ pokemon, teamIndex }: CardProps) => {
  const teamContext = useContext(TeamContext);
  const windowSizes = useWindowSize();

  return (
    <Container>
      {!pokemon.isLocked && teamContext.isLoading ? (
        <>
          <SkeletonDetail />
          {windowSizes.size.width > breakpoints.s && <SkeletonMoves />}
        </>
      ) : (
        <>
          <PokemonDetail pokemon={pokemon} teamIndex={teamIndex} />
          <Moves moves={pokemon.moves} pokemonId={pokemon.id}></Moves>
        </>
      )}
    </Container>
  );
};

export default Card;
