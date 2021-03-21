import { MovePAPI } from '../pokeapi/models/move.papi';
import { PokemonPAPI } from '../pokeapi/models/pokemon.papi';
import { Move } from '../randemon/models/move';
import Pokemon from '../randemon/models/pokemon';
import Type from '../randemon/models/type';

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
        officialArtwork: pokemonPAPI.sprites.other['official-artwork'].front_default,
        types: [
            pokemonPAPI.types[0].type.name.toUpperCase() as Type,
            pokemonPAPI.types[1]?.type.name.toUpperCase() as Type
        ],
        allMovesNames,
        moves: [],
        isLocked: false
    };
}

export function mapMoveFromAPI(movePAPI: MovePAPI): Move {
    return { ...movePAPI, type: movePAPI.type.name.toUpperCase() as Type };
}
