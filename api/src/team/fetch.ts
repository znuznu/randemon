import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from '../constants';
import { mapPokemonFromAPI } from '../mappers/pokemonMapper';
import { PokemonPAPI } from '../pokeapi/models/pokemon.papi';
import { TypePAPI } from '../pokeapi/models/type.papi';
import { UrlBuilder } from '../utils';
import endpoints from '../pokeapi/endpoints';
import Pokemon from '../models/randemon/pokemon';
import teamService from './teamService';
import Type from '../models/randemon/type';

async function fetchPokemonByNameOrId(nameOrId: string): Promise<Pokemon | null> {
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
            return null;
        });
}

async function fetchPokemonByTypes(type: Type) {
    return axios
        .get(
            new UrlBuilder(API_URL)
                .with(endpoints.get('getTypeByName')!)
                .with(type.toLowerCase()).url
        )
        .then(async (response: AxiosResponse) => {
            const typeFromAPI: TypePAPI = response.data;
            let pokemonFetched: Pokemon[] = [];

            for (const typePokemonPAPI of typeFromAPI.pokemon) {
                const pokemon = await teamService.getPokemonByName(
                    typePokemonPAPI.pokemon.name
                );

                if (pokemon) {
                    pokemonFetched.push(pokemon);
                }
            }

            return pokemonFetched;
        })
        .catch((error: AxiosError) => {
            console.error(error.message);
            console.error(`An error occured while getting type with name or id ${type}`);
            throw new Error(error.message);
        });
}

export { fetchPokemonByNameOrId, fetchPokemonByTypes };
