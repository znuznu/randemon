import { NamedAPIResourcePAPI } from './common';

export interface SpeciesPAPI {
    id: number;
    name: string;
    names: SpeciesNamesPAPI[];
    [key: string]: unknown;
}

interface SpeciesNamesPAPI {
    language: NamedAPIResourcePAPI;
    name: string;
    [key: string]: unknown;
}
