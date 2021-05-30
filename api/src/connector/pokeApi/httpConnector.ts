import { URL } from 'url';

import { HttpService } from '../../core/http/http';
import { Connector } from './connector.interface';
import { mapMove, mapPokemon, mapTypeToIds } from './mappers/mappers';
import { PathBuilder } from '../../utils';
import { PokemonPAPI } from '../../models/pokeapi/pokemon';
import Type from '../../models/randemon/type';
import { TypePAPI } from '../../models/pokeapi/type';
import { Move } from '../../models/randemon/move';
import { MovePAPI } from '../../models/pokeapi/move';
import Pokemon from '../../models/randemon/pokemon';

export interface Config {
    BASE_URL: string;
}

export class HttpConnector implements Connector {
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
}
