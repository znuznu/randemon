import Pokemon from '../models/randemon/pokemon';
import Type from '../models/randemon/type';
import { PokemonPAPI } from '../models/pokeapi/pokemon.papi';
import { MovePAPI } from '../models/pokeapi/move.papi';
import { Move } from '../models/randemon/move';

export function mapPokemonFromAPI(pokemonPAPI: PokemonPAPI): Pokemon {
    const { id, name } = pokemonPAPI;

    const allMovesNames: string[] = [];

    for (const pokemonMovePAPI of pokemonPAPI.moves) {
        allMovesNames.push(pokemonMovePAPI.move.name);
    }

    return {
        id,
        name,
        frontSprite: pokemonPAPI.sprites.front_default,
        types: [
            pokemonPAPI.types[0].type.name.toUpperCase() as Type,
            pokemonPAPI.types[1]?.type.name.toUpperCase() as Type
        ],
        allMovesNames,
        moves: []
    };
}

export function mapMoveFromAPI(movePAPI: MovePAPI): Move {
    return { ...movePAPI, type: movePAPI.type.name };
}
