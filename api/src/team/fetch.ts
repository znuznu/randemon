import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from '../constants';
import { mapPokemonFromAPI } from '../mappers/pokemonMapper';
import { PokemonPAPI } from '../models/pokeapi/pokemon.papi';
import { TypePAPI, TypePokemonPAPI } from '../models/pokeapi/type.papi';
import { UrlBuilder } from '../utils';
import endpoints from '../pokeapi/endpoints';
import Pokemon from '../models/randemon/pokemon';
import Type from '../models/randemon/type';
import { getPokemonByName } from './getters';

async function fetchPokemonByNameOrId(nameOrId: string): Promise<Pokemon> {
    return axios
        .get(
            new UrlBuilder(API_URL).with(endpoints.get('getPokemonById')!).with(nameOrId)
                .url
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
                .with(endpoints.get('getTypeByName')!)
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

export { fetchPokemonByNameOrId, fetchTypePokemonPAPIByType };
