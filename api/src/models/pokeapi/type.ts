import { NamedAPIResourcePAPI } from './common';

export interface TypePokemonPAPI {
    slot: number;
    pokemon: NamedAPIResourcePAPI;
    [key: string]: unknown;
}

// Endpoint /type/<type>
export interface TypePAPI {
    name: string;
    pokemon: TypePokemonPAPI[];
    [key: string]: unknown;
}

export interface PokemonTypePAPI {
    slot: number;
    type: NamedAPIResourcePAPI;
    [key: string]: unknown;
}
