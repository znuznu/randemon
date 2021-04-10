import React, { useContext } from 'react';

import styled from 'styled-components';

import { LockOpen, LockClosed } from '@styled-icons/ionicons-sharp';

import { Context as TeamContext } from '../../../contexts/teamContext';

import { TYPES_COLORS } from '../../../../styles/theme/typesColors';
import Pokemon from '../../../models/pokemon';
import TypeBadge from '../../commons/styles/TypeBadge';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.primary};

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.m}px) {
    padding: 0 1rem 1rem 0;
    margin: 0 1rem 0 0;
    border-bottom: none;
    border-right: 1px solid ${(props) => props.theme.primary};
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.s}px) {
    padding: 0 0 1rem 0;
    margin: 0;
    border: none;
  }
`;

const Name = styled.h2`
  font-family: 'Lato';
  text-transform: capitalize;
  text-align: center;

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    font-size: 20px;
  }
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LockIconClosed = styled(LockClosed)`
  width: 28px;
  &:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    width: 24px;
  }
`;

const LockIconOpen = styled(LockOpen)`
  width: 28px;
  &:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    width: 24px;
  }
`;

const Id = styled.h2`
  font-family: 'Lato';
  margin: 0;
  font-weight: 800;
  color: ${(props) => props.theme.primary};

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    font-size: 20px;
  }
`;

const Types = styled.div`
  display: flex;
  margin: 0 auto;
`;

const Badge = styled(TypeBadge)`
  font-size: 16px;

  &:last-child {
    margin-left: 0.25rem;
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    font-size: 14px;
  }
`;

const Artwork = styled.img`
  width: 190px;
  margin: 0 auto;
`;

type PokemonDetailProps = {
  pokemon: Pokemon;
  teamIndex: number;
};

const PokemonDetail = ({ pokemon, teamIndex }: PokemonDetailProps) => {
  const teamContext = useContext(TeamContext);

  const updateLock = (teamIndex: number) => {
    if (teamContext.isLoading) {
      return;
    }

    teamContext.toggleLock!(teamIndex);
  };

  return (
    <Container>
      <Heading>
        <Id>#{pokemon.id}</Id>
        {pokemon.isLocked ? (
          <LockIconClosed opacity={1} onClick={() => updateLock(teamIndex)} />
        ) : (
          <LockIconOpen opacity={1} onClick={() => updateLock(teamIndex)} />
        )}
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
