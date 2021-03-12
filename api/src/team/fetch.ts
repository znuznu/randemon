import axios, { AxiosError, AxiosResponse } from 'axios';

import { config } from '../config';
import endpoints from '../pokeapi/endpoints';
import Type from '../models/randemon/type';
import { UrlBuilder } from '../utils';
import { PokemonPAPI } from '../models/pokeapi/pokemon.papi';
import { TypePAPI, TypePokemonPAPI } from '../models/pokeapi/type.papi';
import { MovePAPI } from '../models/pokeapi/move.papi';

const API_URL = config.API_URL;

async function fetchPokemonByNameOrId(nameOrId: string): Promise<PokemonPAPI> {
    return axios
        .get(
            new UrlBuilder(API_URL).with(endpoints.get('getPokemon')!).with(nameOrId).url
        )
        .then((response: AxiosResponse) => {
            const pokemonFromAPI: PokemonPAPI = response.data;
            return pokemonFromAPI;
        });
}

async function fetchTypePokemonPAPIByType(type: Type): Promise<TypePokemonPAPI[]> {
    return axios
        .get(
            new UrlBuilder(API_URL)
                .with(endpoints.get('getType')!)
                .with(type.toLowerCase()).url
        )
        .then((response: AxiosResponse) => {
            const typeFromAPI: TypePAPI = response.data;
            return typeFromAPI.pokemon;
        });
}

async function fetchMove(nameOrId: string): Promise<MovePAPI> {
    return axios
        .get(new UrlBuilder(API_URL).with(endpoints.get('getMove')!).with(nameOrId).url)
        .then((response: AxiosResponse) => {
            const moveFromAPI: MovePAPI = response.data;
            return moveFromAPI;
        });
}

export { fetchMove, fetchPokemonByNameOrId, fetchTypePokemonPAPIByType };
