import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

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
  font-family: 'Inter';
  text-transform: capitalize;
  text-align: center;
`;

const Id = styled.h2`
  font-family: 'Inter';
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
      <Id>#{pokemon.id}</Id>
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
