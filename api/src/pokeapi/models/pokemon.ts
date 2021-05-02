import { PokemonMovePAPI } from './move';
import { PokemonTypePAPI } from './type';
import SpritePAPI from './sprite';

export interface PokemonPAPI {
    id: number;
    name: string;
    sprites: SpritePAPI;
    types: [PokemonTypePAPI, PokemonTypePAPI?];
    moves: PokemonMovePAPI[];
    [key: string]: unknown;
}
