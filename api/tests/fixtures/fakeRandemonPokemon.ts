import Pokemon from '../../src/models/randemon/pokemon';

export const fakeRandemonPokemonWithOneType: Pokemon = {
    id: 6,
    name: 'charizard',
    frontSprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
    officialArtwork:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
    types: ['FIRE', null],
    allMoveNames: ['mega-punch', 'fire-punch', 'thunder-punch', 'scratch'],
    moves: [],
    isLocked: false
};

export const fakeRandemonPokemonWithTwoTypes: Pokemon = {
    id: 6,
    name: 'charizard',
    frontSprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
    officialArtwork:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
    types: ['FIRE', 'FLYING'],
    allMoveNames: ['mega-punch', 'fire-punch', 'thunder-punch', 'scratch'],
    moves: [],
    isLocked: false
};

export const fakeRandemonPokemon110: Pokemon = {
    id: 110,
    name: 'whataname',
    frontSprite: 'http://front_default',
    officialArtwork: 'http://artwork',
    types: ['FIRE', 'ICE'],
    moves: [],
    allMoveNames: ['some', 'cool', 'moves'],
    isLocked: false
};
