import { MouseEvent, useContext } from 'react';

import styled from 'styled-components';

import { Context as CurrentPokemonModalContext } from '../../contexts/currentPokemonModalContext';
import PokemonDetail from './PokemonDetail';
import Moves from './Moves/Moves';
import { createPortal } from 'react-dom';

const Background = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 0.25rem;
  padding: 0.8rem;
  background-color: white;

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.m}px) {
    flex-direction: row;
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.s}px) {
    flex-direction: column;
  }
`;

const ModalCard = () => {
  const currentPokemonModalContext = useContext(CurrentPokemonModalContext);

  const removeCurrentPokemonDetail = () => {
    currentPokemonModalContext.setPokemon!(null);
  };

  // Meh ?
  const stopPropagation = (event: MouseEvent) => {
    event.stopPropagation();
  };

  return createPortal(
    currentPokemonModalContext.pokemon && (
      <Background onClick={removeCurrentPokemonDetail}>
        <Container onClick={stopPropagation}>
          <PokemonDetail pokemon={currentPokemonModalContext.pokemon} />
          <Moves
            moves={currentPokemonModalContext.pokemon.moves}
            pokemonId={currentPokemonModalContext.pokemon.id}
          />
        </Container>
      </Background>
    ),
    document.querySelector('#modal-pokemon')!
  );
};

export default ModalCard;
