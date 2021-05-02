import { MovePAPI } from '../pokeapi/models/move';
import { PokemonPAPI } from '../pokeapi/models/pokemon';
import { Move } from '../randemon/models/move';
import Pokemon from '../randemon/models/pokemon';
import Type from '../randemon/models/type';

const typeMapper: Record<string, Type> = {
    normal: 'NORMAL',
    fire: 'FIRE',
    fighting: 'FIGHTING',
    water: 'WATER',
    flying: 'FLYING',
    grass: 'GRASS',
    poison: 'POISON',
    electric: 'ELECTRIC',
    ground: 'GROUND',
    psychic: 'PSYCHIC',
    rock: 'ROCK',
    ice: 'ICE',
    bug: 'BUG',
    dragon: 'DRAGON',
    ghost: 'GHOST',
    dark: 'DARK',
    steel: 'STEEL',
    fairy: 'FAIRY'
};

export function mapPokemonFromAPI(pokemonPAPI: PokemonPAPI): Pokemon {
    const { id, name } = pokemonPAPI;

    const allMovesNames: string[] = pokemonPAPI.moves.map(
        (moveResource) => moveResource.move.name
    );

    return {
        id,
        name,
        frontSprite: pokemonPAPI.sprites.front_default,
        officialArtwork: pokemonPAPI.sprites.other['official-artwork'].front_default,
        types: [
            typeMapper[pokemonPAPI.types[0].type.name],
            pokemonPAPI.types[1] && typeMapper[pokemonPAPI.types[1].type.name]
        ],
        allMovesNames,
        moves: [],
        isLocked: false
    };
}

export function mapMoveFromAPI(movePAPI: MovePAPI): Move {
    return { ...movePAPI, type: typeMapper[movePAPI.type.name] };
}
