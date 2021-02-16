import { NamedAPIResourcePAPI } from './common.papi';

export interface MovePAPI {
    accuracy: number | null;
    power: number | null;
    pp: number;
    type: NamedAPIResourcePAPI;
    name: string;
}

export interface PokemonMovePAPI {
    move: NamedAPIResourcePAPI;
}
