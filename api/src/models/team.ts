import Generation from './generation';
import Pokemon from './pokemon';

export interface Team {
    pokemons: Pokemon[];
}

export interface TeamParameters {
    generations?: Generation[];
    numbersOfPokemons?: number;
}
