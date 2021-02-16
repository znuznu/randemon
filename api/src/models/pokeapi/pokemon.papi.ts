import { NamedAPIResourcePAPI } from './common.papi';
import SpritePAPI from './sprite.papi';

export interface PokemonTypePAPI {
    slot: number;
    type: NamedAPIResourcePAPI;
}

export interface PokemonPAPI {
    id: number;
    name: string;
    sprites: SpritePAPI;
    types: [PokemonTypePAPI, PokemonTypePAPI?];
}
