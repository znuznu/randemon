import axios, { AxiosResponse } from 'axios';

import { config } from '../config';
import { MovePAPI } from '../pokeapi/models/move.papi';
import { PokemonPAPI } from '../pokeapi/models/pokemon.papi';
import { TypePAPI, TypePokemonPAPI } from '../pokeapi/models/type.papi';
import { UrlBuilder } from '../utils';
import endpoints from '../pokeapi/endpoints/endpoints';
import Type from '../randemon/models/type';

const API_URL = config.API_URL;

async function fetchPokemon(nameOrId: string): Promise<PokemonPAPI> {
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

export { fetchMove, fetchPokemon, fetchTypePokemonPAPIByType };
