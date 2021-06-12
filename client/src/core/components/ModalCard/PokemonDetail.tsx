import { useContext } from 'react';

import styled from 'styled-components';

import { CloseCircle } from '@styled-icons/ionicons-sharp/CloseCircle';
import { Context as CurrentPokemonModalContext } from '../../contexts/currentPokemonModalContext';

import { TYPES_COLORS } from '../../../styles/theme/typesColors';
import Pokemon from '../../models/pokemon';
import TypeBadge from '../commons/styles/TypeBadge';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.primary};

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

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    width: 150px;
  }
`;

const CloseIcon = styled(CloseCircle)`
  width: 24px;
  &:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    width: 20px;
  }
`;

type PokemonDetailProps = {
  pokemon: Pokemon;
};

type JapaneseNameProps = {
  hasLongName: boolean;
};

const JapaneseName = styled.div<JapaneseNameProps>`
  position: absolute;
  z-index: -1;
  opacity: 0.1;
  top: 45px;
  left: 10px;
  font-weight: bold;
  font-size: ${(props) => (props.hasLongName ? '46' : '56')}px;
  writing-mode: vertical-rl;
  text-orientation: upright;

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    font-size: 36px;
  }
`;

const PokemonDetail = ({ pokemon }: PokemonDetailProps) => {
  const currentPokemonModalContext = useContext(CurrentPokemonModalContext);

  const removeCurrentPokemonDetail = () => {
    currentPokemonModalContext.setPokemon!(null);
  };

  return (
    <Container>
      <Heading>
        <Id>#{pokemon.id}</Id>
        <CloseIcon opacity={1} onClick={removeCurrentPokemonDetail} />
      </Heading>
      {pokemon.officialArtwork && <Artwork src={pokemon.officialArtwork} />}
      {pokemon.names.japanese && (
        <JapaneseName hasLongName={pokemon.names.japanese.length > 5}>
          {pokemon.names.japanese}
        </JapaneseName>
      )}
      <Name>{pokemon.names.english}</Name>
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
