import { fakePokeAPIMoveHyperBeam } from '../../../../tests/fixtures/fakePokeAPIMove';
import {
    fakePAPIPokemonWithOneType,
    fakePAPIPokemonWithTwoTypes
} from '../../../../tests/fixtures/fakePokeAPIPokemon';
import { fakePokeAPITypeFire } from '../../../../tests/fixtures/fakePokeAPIType';
import { mapMove, mapPokemon, mapTypeToIds } from './mappers';

describe('Mappers - unit', () => {
    describe('#mapPokemon', () => {
        describe('when a pokemon from the API with one type is passed', () => {
            it('should return the pokemon mapped', () => {
                expect(mapPokemon(fakePAPIPokemonWithOneType)).toEqual({
                    id: 6,
                    name: 'charizard',
                    frontSprite:
                        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
                    officialArtwork:
                        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
                    types: ['FIRE', null],
                    allMoveNames: [
                        'mega-punch',
                        'fire-punch',
                        'thunder-punch',
                        'scratch'
                    ],
                    moves: [],
                    isLocked: false
                });
            });
        });

        describe('when a pokemon from API with two types is passed', () => {
            it('should return the pokemon mapped', () => {
                expect(mapPokemon(fakePAPIPokemonWithTwoTypes)).toEqual({
                    id: 6,
                    name: 'charizard',
                    frontSprite:
                        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
                    officialArtwork:
                        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
                    types: ['FIRE', 'FLYING'],
                    allMoveNames: [
                        'mega-punch',
                        'fire-punch',
                        'thunder-punch',
                        'scratch'
                    ],
                    moves: [],
                    isLocked: false
                });
            });
        });
    });

    describe('#mapMove', () => {
        describe('when a move from the API is passed', () => {
            it('should return the move mapped', () => {
                expect(mapMove(fakePokeAPIMoveHyperBeam)).toEqual({
                    accuracy: 90,
                    power: 150,
                    pp: 5,
                    type: 'NORMAL',
                    name: 'hyper-beam'
                });
            });
        });
    });

    describe('#mapTypeToIds', () => {
        describe('when the provided data from the API is passed', () => {
            it('should return the pokemon', () => {
                expect(mapTypeToIds(fakePokeAPITypeFire)).toEqual([
                    4,
                    5,
                    6,
                    37,
                    38,
                    58,
                    59,
                    77,
                    78,
                    126
                ]);
            });
        });
    });
});
