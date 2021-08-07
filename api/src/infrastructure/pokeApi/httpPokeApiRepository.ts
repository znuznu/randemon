import { URL } from 'url';

import { mapMove, mapPokemon, mapSpecies, mapTypeToIds } from './mappers/mappers';
import { PathBuilder } from '../../utils';
import { PokemonPAPI } from './models/pokemon';
import Type from '../../domain/models/type';
import { TypePAPI } from './models/type';
import { Move } from '../../domain/models/move';
import { MovePAPI } from './models/move';
import Pokemon from '../../domain/models/pokemon';
import { SpeciesPAPI } from './models/species';
import { HttpService } from '../../domain/ports/http/http.service';
import PokeApiRepository from '../../domain/ports/pokeApiRepository';

export interface Config {
    BASE_URL: string;
}

export default class HttpPokeApiRepository implements PokeApiRepository {
    private baseURL: string;

    constructor(private config: Config, private httpService: HttpService) {
        this.baseURL = config.BASE_URL;
    }

    async getPokemon(nameOrId: string): Promise<Pokemon> {
        const pathBuilder = new PathBuilder(this.baseURL).with('pokemon').with(nameOrId);
        const response = await this.httpService.get(new URL(pathBuilder.path));

        if (!Object.keys(response.json()).length) {
            throw new Error(`No data found for the Pokemon with name or id ${nameOrId}`);
        }

        return mapPokemon(response.json<PokemonPAPI>());
    }

    async getAllPokemonIdsWithType(type: Type): Promise<number[]> {
        const pathBuilder = new PathBuilder(this.baseURL)
            .with('type')
            .with(type.toLowerCase());
        const response = await this.httpService.get(new URL(pathBuilder.path));

        if (!Object.keys(response.json()).length) {
            throw new Error(`No data found for the Pokemon type ${type.toLowerCase()}`);
        }

        return mapTypeToIds(response.json<TypePAPI>());
    }

    async getMove(nameOrId: string): Promise<Move> {
        const pathBuilder = new PathBuilder(this.baseURL).with('move').with(nameOrId);
        const response = await this.httpService.get(new URL(pathBuilder.path));

        if (!Object.keys(response.json()).length) {
            throw new Error(`No data found for the move with name or id ${nameOrId}`);
        }

        return mapMove(response.json<MovePAPI>());
    }

    async getSpeciesData(pokemon: Pokemon): Promise<Pokemon> {
        const pathBuilder = new PathBuilder(this.baseURL)
            .with('pokemon-species')
            .with(pokemon.id.toString());
        const response = await this.httpService.get(new URL(pathBuilder.path));

        if (!Object.keys(response.json()).length) {
            throw new Error(`No data found for the species with id ${pokemon.id}`);
        }

        return mapSpecies(response.json<SpeciesPAPI>(), pokemon);
    }
}
