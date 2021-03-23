import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { IconContext } from 'react-icons';
import { IoLockClosedSharp, IoLockOpenSharp } from 'react-icons/io5';

import { TYPES_COLORS } from '../../../../styles/theme/typesColors';
import Pokemon from '../../../models/pokemon';
import TypeBadge from '../../commons/styles/TypeBadge';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  border-bottom: 1px solid black;
`;

const Name = styled.h2`
  font-family: 'Lato';
  text-transform: capitalize;
  text-align: center;
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Lock = styled.span`
  &:hover {
    cursor: pointer;
  }
`;

const Id = styled.h2`
  font-family: 'Lato';
  margin: 0;
  font-weight: 800;
  color: black;
`;

const Types = styled.div`
  display: flex;
  margin: 0 auto;
`;

const Badge = styled(TypeBadge)`
  &:last-child {
    margin-left: 0.25rem;
  }
`;

const Artwork = styled.img`
  width: 190px;
  margin: 0 auto;
`;

type PokemonDetailProps = {
  pokemon: Pokemon;
};

const PokemonDetail = ({ pokemon }: PokemonDetailProps) => {
  return (
    <Container>
      <Heading>
        <Id>#{pokemon.id}</Id>
        <IconContext.Provider value={{ color: 'black', size: '24px' }}>
          <Lock>
            {pokemon.isLocked ? (
              <IoLockClosedSharp opacity={1} />
            ) : (
              <IoLockOpenSharp opacity={1} />
            )}
          </Lock>
        </IconContext.Provider>
      </Heading>
      {pokemon.officialArtwork && <Artwork src={pokemon.officialArtwork} />}
      <Name>{pokemon.name}</Name>
      {pokemon.types && (
        <Types>
          {pokemon.types.map((type) => {
            return (
              type && (
                <Badge key={`${type}`} color={TYPES_COLORS[type]}>
                  {type}
                </Badge>
              )
            );
          })}
        </Types>
      )}
    </Container>
  );
};

export default PokemonDetail;
