import { MovePAPI } from '../../../src/pokeapi/models/move.papi';
import { PokemonPAPI } from '../../../src/pokeapi/models/pokemon.papi';
import { TypePokemonPAPI } from '../../../src/pokeapi/models/type.papi';
import { Move } from '../../../src/randemon/models/move';
import Pokemon from '../../../src/randemon/models/pokemon';

const pokemon110: Pokemon = {
    id: 110,
    name: 'pokemon110',
    frontSprite: 'http://front_default',
    officialArtwork: 'http://artwork',
    types: ['FIRE', 'ICE'],
    moves: [],
    allMovesNames: ['some', 'cool', 'moves'],
    isLocked: false
};

const pokemonPAPI110: PokemonPAPI = {
    id: 110,
    name: 'pokemon110',
    sprites: {
        front_default: 'http://front_default',
        other: {
            'official-artwork': {
                front_default: 'http://artwork'
            }
        }
    },
    types: [
        {
            slot: 0,
            type: { name: 'FIRE', url: 'http://type1' }
        },
        {
            slot: 1,
            type: { name: 'ICE', url: 'http://type2' }
        }
    ],
    moves: [
        { move: { name: 'some', url: 'some_url' } },
        { move: { name: 'cool', url: 'cool_url' } },
        { move: { name: 'moves', url: 'moves_url' } }
    ]
};

const movePAPIHyperBeam: MovePAPI = {
    accuracy: 90,
    power: 150,
    pp: 5,
    type: {
        name: 'NORMAL',
        url: 'http://hyper_beam_url'
    },
    name: 'hyper-beam'
};

const moveHyperBeam: Move = {
    accuracy: 90,
    power: 150,
    pp: 5,
    type: 'NORMAL',
    name: 'hyper-beam'
};

const typePokemonPAPIFire: TypePokemonPAPI[] = [
    {
        pokemon: {
            name: 'charmander',
            url: 'https://pokeapi.co/api/v2/pokemon/4/'
        },
        slot: 1
    },
    {
        pokemon: {
            name: 'charmeleon',
            url: 'https://pokeapi.co/api/v2/pokemon/5/'
        },
        slot: 1
    },
    {
        pokemon: {
            name: 'charizard',
            url: 'https://pokeapi.co/api/v2/pokemon/6/'
        },
        slot: 1
    },
    {
        pokemon: {
            name: 'vulpix',
            url: 'https://pokeapi.co/api/v2/pokemon/37/'
        },
        slot: 1
    },
    {
        pokemon: {
            name: 'ninetales',
            url: 'https://pokeapi.co/api/v2/pokemon/38/'
        },
        slot: 1
    },
    {
        pokemon: {
            name: 'growlithe',
            url: 'https://pokeapi.co/api/v2/pokemon/58/'
        },
        slot: 1
    },
    {
        pokemon: {
            name: 'arcanine',
            url: 'https://pokeapi.co/api/v2/pokemon/59/'
        },
        slot: 1
    },
    {
        pokemon: {
            name: 'ponyta',
            url: 'https://pokeapi.co/api/v2/pokemon/77/'
        },
        slot: 1
    },
    {
        pokemon: {
            name: 'rapidash',
            url: 'https://pokeapi.co/api/v2/pokemon/78/'
        },
        slot: 1
    },
    {
        pokemon: {
            name: 'magmar',
            url: 'https://pokeapi.co/api/v2/pokemon/126/'
        },
        slot: 1
    }
];

export {
    pokemon110,
    pokemonPAPI110,
    moveHyperBeam,
    movePAPIHyperBeam,
    typePokemonPAPIFire
};
