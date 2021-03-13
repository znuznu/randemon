import Generation from './generation';
import Pokemon from './pokemon';
import Type from './type';

export interface Team {
    pokemon: Pokemon[];
}

export interface TeamConfig {
    generations: Generation[];
    numbersOfPokemon: number;
}

export interface TeamConfigWithType extends TeamConfig {
    type: Type;
}
