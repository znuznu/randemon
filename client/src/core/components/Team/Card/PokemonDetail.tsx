import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { TYPES_COLORS } from '../../../../styles/theme/typesColors';
import Pokemon from '../../../models/pokemon';

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  color: #666666;
  opacity: 0.2;
`;

const Types = styled.div`
  display: flex;
  margin: 0 auto;
`;

const TypeBadge = styled.span`
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  color: white;
  background-color: ${(props) => props.color};
  text-transform: uppercase;
  padding: 0 0.25rem;
  border-radius: 0.125rem;
  font-family: 'OpenSans';
  font-weight: 800;
  font-size: 16px;
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
                <TypeBadge key={`${type}`} color={TYPES_COLORS[type]}>
                  {type}
                </TypeBadge>
              )
            );
          })}
        </Types>
      )}
    </Container>
  );
};

export default PokemonDetail;
