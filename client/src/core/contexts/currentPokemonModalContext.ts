import { createContext } from 'react';

import Pokemon from '../models/pokemon';

type CurrentPokemonModal = {
  pokemon: Pokemon | null;
  setPokemon: ((pokemon: Pokemon | null) => void) | null;
};

const Context = createContext<CurrentPokemonModal>({
  pokemon: null,
  setPokemon: null
});

export { Context };
