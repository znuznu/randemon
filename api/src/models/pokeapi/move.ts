import { NamedAPIResourcePAPI } from './common';

export interface MovePAPI {
    accuracy: number | null;
    power: number | null;
    pp: number;
    type: NamedAPIResourcePAPI;
    name: string;
    [key: string]: unknown;
}

export interface PokemonMovePAPI {
    move: NamedAPIResourcePAPI;
    [key: string]: unknown;
}
