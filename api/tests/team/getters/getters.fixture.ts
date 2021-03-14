import { MovePAPI } from '../../../src/pokeapi/models/move.papi';
import { PokemonPAPI } from '../../../src/pokeapi/models/pokemon.papi';
import { Move } from '../../../src/randemon/models/move';
import Pokemon from '../../../src/randemon/models/pokemon';

const pokemon110: Pokemon = {
    id: 110,
    name: 'pokemon110',
    frontSprite: 'http://front_default',
    types: ['FIRE', 'ICE'],
    moves: [],
    allMovesNames: ['some', 'cool', 'moves']
};

const pokemonPAPI110: PokemonPAPI = {
    id: 110,
    name: 'pokemon110',
    sprites: {
        front_default: 'http://front_default'
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
        name: 'normal',
        url: 'http://hyper_beam_url'
    },
    name: 'hyper-beam'
};

const moveHyperBeam: Move = {
    accuracy: 90,
    power: 150,
    pp: 5,
    type: 'normal',
    name: 'hyper-beam'
};

export { pokemon110, pokemonPAPI110, moveHyperBeam, movePAPIHyperBeam };
