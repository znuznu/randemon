import axios, { AxiosResponse } from 'axios';
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
            });
    }
};

export default teamRequests;
