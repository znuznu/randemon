import axios, { AxiosError, AxiosResponse } from 'axios';
import getConfig from '../config';
import { mapMoveFromAPI, mapPokemonFromAPI } from '../mappers/mappers';
import { PokemonPAPI } from '../models/pokeapi/pokemon.papi';
import { TypePAPI, TypePokemonPAPI } from '../models/pokeapi/type.papi';
import { UrlBuilder } from '../utils';
import { MovePAPI } from '../models/pokeapi/move.papi';
import { Move } from '../models/randemon/move';
import endpoints from '../pokeapi/endpoints';
import Pokemon from '../models/randemon/pokemon';
import Type from '../models/randemon/type';

const API_URL = getConfig().API_URL;

async function fetchPokemonByNameOrId(nameOrId: string): Promise<Pokemon> {
    return axios
        .get(
            new UrlBuilder(API_URL).with(endpoints.get('getPokemon')!).with(nameOrId).url
        )
        .then((response: AxiosResponse) => {
            const pokemonFromAPI: PokemonPAPI = response.data;
            return mapPokemonFromAPI(pokemonFromAPI);
        })
        .catch((error: AxiosError) => {
            console.error(error.message);
            console.error(
                `An error occured while getting Pokémon with name or id ${nameOrId}`
            );
            throw new Error(error.message);
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
        })
        .catch((error: AxiosError) => {
            console.error(error.message);
            console.error(`An error occured while getting type with name ${type}`);
            throw new Error(error.message);
        });
}

async function fetchMove(nameOrId: string): Promise<Move> {
    return axios
        .get(new UrlBuilder(API_URL).with(endpoints.get('getMove')!).with(nameOrId).url)
        .then((response: AxiosResponse) => {
            const moveFromAPI: MovePAPI = response.data;
            return mapMoveFromAPI(moveFromAPI);
        })
        .catch((error: AxiosError) => {
            console.error(error.message);
            console.error(
                `An error occured while getting Move with name or id ${nameOrId}`
            );
            throw new Error(error.message);
        });
}

export { fetchMove, fetchPokemonByNameOrId, fetchTypePokemonPAPIByType };
