import { fakePokemonAPIMoveHyperBeam } from '../../tests/fixtures/fakePokemonAPIMove';
import {
    fakePAPIPokemonWithOneType,
    fakePAPIPokemonWithTwoTypes
} from '../../tests/fixtures/fakePokemonAPIPokemon';
import { fakeRandemonMoveHyperBeam } from '../../tests/fixtures/fakeRandemonMove';
import {
    fakeRandemonPokemonWithOneType,
    fakeRandemonPokemonWithTwoTypes
} from '../../tests/fixtures/fakeRandemonPokemon';
import { mapMoveFromAPI, mapPokemonFromAPI } from './mappers';

describe('Mappers - unit', () => {
    describe('::mapPokemonFromAPI', () => {
        describe('when a pokemon from API with one type is passed', () => {
            it('should return the pokemon mapped', () => {
                expect(mapPokemonFromAPI(fakePAPIPokemonWithOneType)).toEqual(
                    fakeRandemonPokemonWithOneType
                );
            });
        });

        describe('when a pokemon from API with two types is passed', () => {
            it('should return the pokemon mapped', () => {
                expect(mapPokemonFromAPI(fakePAPIPokemonWithTwoTypes)).toEqual(
                    fakeRandemonPokemonWithTwoTypes
                );
            });
        });
    });

    describe('::mapMoveFromAPI', () => {
        describe('when a move from API is passed', () => {
            it('should return the move mapped', () => {
                expect(mapMoveFromAPI(fakePokemonAPIMoveHyperBeam)).toEqual(
                    fakeRandemonMoveHyperBeam
                );
            });
        });
    });
});
