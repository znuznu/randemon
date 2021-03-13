import { PokemonMovePAPI } from './move.papi';
import { PokemonTypePAPI } from './type.papi';
import SpritePAPI from './sprite.papi';

export interface PokemonPAPI {
    id: number;
    name: string;
    sprites: SpritePAPI;
    types: [PokemonTypePAPI, PokemonTypePAPI?];
    moves: PokemonMovePAPI[];
}
