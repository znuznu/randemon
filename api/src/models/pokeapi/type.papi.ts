import { NamedAPIResourcePAPI } from './common.papi';

export interface TypePokemonPAPI {
    slot: number;
    pokemon: NamedAPIResourcePAPI;
}

export interface TypePAPI {
    name: string;
    pokemon: TypePokemonPAPI[];
}

export interface PokemonTypePAPI {
    slot: number;
    type: NamedAPIResourcePAPI;
}
