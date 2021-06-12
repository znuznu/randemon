import { MovePAPI } from '../../../models/pokeapi/move';
import { PokemonPAPI } from '../../../models/pokeapi/pokemon';
import { SpeciesPAPI } from '../../../models/pokeapi/species';
import { TypePAPI } from '../../../models/pokeapi/type';
import { Move } from '../../../models/randemon/move';
import Pokemon from '../../../models/randemon/pokemon';
import Type from '../../../models/randemon/type';

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

export function mapPokemon(pokemonPAPI: PokemonPAPI): Pokemon {
    const { id, name } = pokemonPAPI;

    const allMoveNames: string[] = pokemonPAPI.moves.map(
        (moveResource) => moveResource.move.name
    );

    return {
        id,
        names: { english: name },
        frontSprite: pokemonPAPI.sprites.front_default,
        officialArtwork: pokemonPAPI.sprites.other['official-artwork'].front_default,
        types: [
            typeMapper[pokemonPAPI.types[0].type.name],
            pokemonPAPI.types[1] ? typeMapper[pokemonPAPI.types[1].type.name] : null
        ],
        allMoveNames,
        moves: [],
        isLocked: false
    };
}

export function mapMove(movePAPI: MovePAPI): Move {
    return { ...movePAPI, type: typeMapper[movePAPI.type.name] };
}

const pokemonIdFromURLRegexp = /\/(\d+)\/$/;
export function mapTypeToIds(pokemonType: TypePAPI): number[] {
    const typeIds: number[] = [];

    pokemonType.pokemon.forEach((resource) => {
        const match = pokemonIdFromURLRegexp.exec(resource.pokemon.url);

        if (match) {
            typeIds.push(parseInt(match[1]));
        }
    });

    return typeIds;
}

export function mapSpecies(species: SpeciesPAPI, pokemon: Pokemon): Pokemon {
    for (const speciesName of species.names) {
        if (speciesName.language.name === 'ja-Hrkt') {
            return {
                ...pokemon,
                names: {
                    ...pokemon.names,
                    japanese: speciesName.name
                }
            };
        }
    }

    return pokemon;
}
