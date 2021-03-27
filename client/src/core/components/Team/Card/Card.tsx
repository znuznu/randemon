import React, { useContext, useEffect, useState } from 'react';
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
  border: 1px solid black;
  border-radius: 0.25rem;
  padding: 0.8rem;
`;

// const SkeletonDetail = styled.div`
//   height: 372px;
//   background-repeat: no-repeat;
//   background-image: linear-gradient(#dfe5ec 40px, transparent 0),
//     linear-gradient(#dfe5ec 40px, transparent 0),
//     linear-gradient(#dfe5ec 40px, transparent 0),
//     radial-gradient(circle 60px, #dfe5ec 99%, transparent 0),
//     linear-gradient(white 100%, transparent 0);
//   background-size: 60px 20px, 96px 20px, 96px 20px, 120px 120px, 100% 100%;
//   background-position: 15px 15px, 138px 190px, 138px 220px, 126px 50px, 0 0;

//   animation: fadeIn ease-out 0.8s;
//   animation-iteration-count: infinite;
//   animation-direction: alternate;

//   @keyframes fadeIn {
//     0% {
//       opacity: 0.6;
//     }
//     100% {
//       opacity: 1;
//     }
//   }
// `;

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
