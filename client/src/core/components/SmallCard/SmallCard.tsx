import React, { MouseEvent, useContext, useState } from 'react';

import styled from 'styled-components';

import { LockOpen, LockClosed } from '@styled-icons/ionicons-sharp';

import { Context as CurrentPokemonModalContext } from '../../contexts/currentPokemonModalContext';
import { Context as TeamContext } from '../../contexts/teamContext';
import Pokemon from '../../models/pokemon';
import SkeletonBar from './SkeletonBar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 0.25rem;
  padding: 0.5rem;
  width: 128px;

  &:hover {
    cursor: pointer;
  }
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
`;

type NameProps = {
  isHovered: boolean;
};

const Id = styled.h3`
  font-family: 'Lato';
  margin: auto 0.5rem 0 0;
  font-weight: 800;
  color: ${(props) => props.theme.primary};

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    font-size: 17px;
  }
`;

const Name = styled.h3<NameProps>`
  font-family: 'Lato';
  margin: auto 0 0;
  padding: 0;
  text-transform: capitalize;
  text-align: center;

  background-color: ${(props) =>
    props.isHovered ? props.theme.primary : props.theme.secondary};
  color: ${(props) => (props.isHovered ? props.theme.secondary : props.theme.primary)};

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    font-size: 17px;
  }
`;

const Sprite = styled.img`
  margin: 0 auto;
  width: 96px;
`;

const LockIconClosed = styled(LockClosed)`
  width: 24px;
  &:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    width: 20px;
  }
`;

const LockIconOpen = styled(LockOpen)`
  width: 24px;
  &:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    width: 20px;
  }
`;

type BarProps = {
  pokemon: Pokemon;
  teamIndex: number;
};

const SmallCard = ({ pokemon, teamIndex }: BarProps) => {
  const teamContext = useContext(TeamContext);
  const currentPokemonModalContext = useContext(CurrentPokemonModalContext);
  const [isHovered, setIsHovered] = useState(false);

  const updateLock = (event: MouseEvent, teamIndex: number) => {
    if (teamContext.isLoading) {
      return;
    }

    event.stopPropagation();

    teamContext.toggleLock!(teamIndex);
  };

  const toggleDetail = () => {
    if (teamContext.isLoading) {
      return;
    }

    currentPokemonModalContext.setPokemon!(pokemon);
  };

  return (
    <Container
      onClick={toggleDetail}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!pokemon.isLocked && teamContext.isLoading ? (
        <SkeletonBar />
      ) : (
        <>
          <Heading>
            <Id>#{pokemon.id}</Id>
            {pokemon.isLocked ? (
              <LockIconClosed
                opacity={1}
                onClick={(event) => updateLock(event, teamIndex)}
              />
            ) : (
              <LockIconOpen
                opacity={1}
                onClick={(event) => updateLock(event, teamIndex)}
              />
            )}
          </Heading>
          {pokemon.frontSprite && <Sprite src={pokemon.frontSprite} />}
          <Name isHovered={isHovered}>{pokemon.name}</Name>{' '}
        </>
      )}
    </Container>
  );
};

export default SmallCard;
