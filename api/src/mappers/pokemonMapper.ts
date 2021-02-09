import Pokemon from '../models/randemon/pokemon';
import Type from '../models/randemon/type';
import { PokemonPAPI } from '../pokeapi/models/pokemon.papi';

export function mapPokemonFromAPI(pokemonPAPI: PokemonPAPI): Pokemon {
    const { id, name } = pokemonPAPI;

    return {
        id,
        name,
        frontSprite: pokemonPAPI.sprites.front_default,
        types: [
            pokemonPAPI.types[0].type.name.toUpperCase() as Type,
            pokemonPAPI.types[1]?.type.name.toUpperCase() as Type
        ]
    };
}
