import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from '../constants';
import { mapPokemonFromAPI } from '../mappers/pokemonMapper';
import endpoints from '../pokeapi/endpoints';
import PokemonPAPI from '../pokeapi/models/pokemon.papi';
import { UrlBuilder } from '../utils';

const teamRequests = {
    getPokemonByNameOrId: async (nameOrId: string) => {
        return axios
            .get(
                new UrlBuilder(API_URL)
                    .with(endpoints.get('getPokemonByName')!)
                    .with(nameOrId).url
            )
            .then((response: AxiosResponse) => {
                const pokemonFromAPI: PokemonPAPI = response.data;
                return mapPokemonFromAPI(pokemonFromAPI);
            })
            .catch((error: AxiosError) => {
                console.error('[ERROR]');
                console.error(error.message);
                console.error(
                    `An error occured while getting Pokémon with name or id ${nameOrId}`
                );
            });
    }
};

export default teamRequests;
