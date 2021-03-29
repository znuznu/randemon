import React, { useContext } from 'react';

import styled from 'styled-components';

import { IconContext } from 'react-icons';
import { IoLockClosedSharp, IoLockOpenSharp } from 'react-icons/io5';

import { Context as TeamContext } from '../../../contexts/teamContext';

import { TYPES_COLORS } from '../../../../styles/theme/typesColors';
import Pokemon from '../../../models/pokemon';
import TypeBadge from '../../commons/styles/TypeBadge';
import { theme } from '../../../../styles/theme/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.primary};

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.m}) {
    padding: 0 1rem 0 0;
    margin: 0 1rem 0 0;
    border-bottom: none;
    border-right: 1px solid ${(props) => props.theme.primary};
  }
`;

const Name = styled.h2`
  font-family: 'Lato';
  text-transform: capitalize;
  text-align: center;

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 18px;
  }
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
  color: ${(props) => props.theme.primary};
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
    teamContext.toggleLock!(teamIndex);
  };

  return (
    <Container>
      <Heading>
        <Id>#{pokemon.id}</Id>
        <IconContext.Provider value={{ color: theme.primary, size: '24px' }}>
          <Lock onClick={() => updateLock(teamIndex)}>
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
