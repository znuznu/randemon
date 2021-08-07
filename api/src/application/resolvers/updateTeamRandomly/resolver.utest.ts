import {
    fakeRandemonMoveHyperBeam,
    fakeRandemonMoveEmber,
    fakeRandemonMoveMegaPunch,
    fakeRandemonMoveScratch
} from '../../../../tests/fixtures/fakeRandemonMove';
import { fakeRandemonPokemonWithOneType } from '../../../../tests/fixtures/fakeRandemonPokemon';
import HttpPokeApiRepository from '../../../infrastructure/pokeApi/httpPokeApiRepository';
import InMemoryCacheService from '../../../infrastructure/services/cache/inMemoryCache.service';
import { createHttpService } from '../../../infrastructure/http/mock';
import { loggerTest } from '../../../infrastructure/services/logger';
import Pokemon from '../../../domain/models/pokemon';
import DataService from '../../../domain/team/services/data.service';
import TeamService from '../../../domain/team/services/team.service';
import UpdateTeamRandomlyResolver from './resolver';
import PokemonRepository from '../../../domain/ports/pokemonRepository';
import CachePokemonRepository from '../../../infrastructure/cache/cachePokemonRepository';
import PokeApiRepository from '../../../domain/ports/pokeApiRepository';

describe('UpdateTeamRandomlyResolver - unit', () => {
    describe('::getPokemonWithRandomMoves', () => {
        let pokemonRepository: PokemonRepository;
        let pokeApiRepository: PokeApiRepository;
        let dataService: DataService;

        beforeEach(() => {
            pokemonRepository = new CachePokemonRepository(new InMemoryCacheService(loggerTest));
            pokeApiRepository = new HttpPokeApiRepository(
                {
                    BASE_URL: 'http://some-url.com'
                },
                createHttpService({
                    get: { status: 200, json: fakeRandemonPokemonWithOneType }
                })
            );
            dataService = new DataService(pokeApiRepository, pokemonRepository);
        });

        describe('when the pokemon has at least 4 moves', () => {
            let result: Pokemon;

            beforeEach(async () => {
                const resolver = new UpdateTeamRandomlyResolver(dataService);

                jest.spyOn(dataService, 'getPokemonById').mockReturnValueOnce(
                    Promise.resolve(fakeRandemonPokemonWithOneType)
                );

                jest.spyOn(TeamService, 'getRandomMoveNames').mockReturnValueOnce([
                    'ember',
                    'scratch',
                    'hyper-beam',
                    'mega-punch'
                ]);

                jest.spyOn(dataService, 'getMoveByName')
                    .mockReturnValueOnce(Promise.resolve(fakeRandemonMoveEmber))
                    .mockReturnValueOnce(Promise.resolve(fakeRandemonMoveScratch))
                    .mockReturnValueOnce(Promise.resolve(fakeRandemonMoveHyperBeam))
                    .mockReturnValueOnce(Promise.resolve(fakeRandemonMoveMegaPunch));

                result = await resolver.getPokemonWithRandomMoves('6');
            });

            afterEach(() => {
                jest.restoreAllMocks();
            });

            it('should return the pokemon with 4 moves', () => {
                expect(result).toEqual({
                    ...fakeRandemonPokemonWithOneType,
                    moves: [
                        fakeRandemonMoveEmber,
                        fakeRandemonMoveScratch,
                        fakeRandemonMoveHyperBeam,
                        fakeRandemonMoveMegaPunch
                    ]
                });
            });
        });

        describe('when the pokemon has less than 4 moves', () => {
            let result: Pokemon;

            beforeEach(async () => {
                const resolver = new UpdateTeamRandomlyResolver(dataService);

                jest.spyOn(dataService, 'getPokemonById').mockReturnValueOnce(
                    Promise.resolve(fakeRandemonPokemonWithOneType)
                );

                jest.spyOn(TeamService, 'getRandomMoveNames').mockReturnValueOnce([
                    'ember',
                    'scratch'
                ]);

                jest.spyOn(dataService, 'getMoveByName')
                    .mockReturnValueOnce(Promise.resolve(fakeRandemonMoveEmber))
                    .mockReturnValueOnce(Promise.resolve(fakeRandemonMoveScratch));

                result = await resolver.getPokemonWithRandomMoves('6');
            });

            afterEach(() => {
                jest.restoreAllMocks();
            });

            it('should return the pokemon with the number of moves he has', () => {
                expect(result).toEqual({
                    ...fakeRandemonPokemonWithOneType,
                    moves: [fakeRandemonMoveEmber, fakeRandemonMoveScratch]
                });
            });
        });

        describe('when the pokemon has no moves', () => {
            let result: Pokemon;

            beforeEach(async () => {
                const resolver = new UpdateTeamRandomlyResolver(dataService);

                jest.spyOn(dataService, 'getPokemonById').mockReturnValueOnce(
                    Promise.resolve(fakeRandemonPokemonWithOneType)
                );

                jest.spyOn(TeamService, 'getRandomMoveNames').mockReturnValueOnce([]);

                result = await resolver.getPokemonWithRandomMoves('6');
            });

            afterEach(() => {
                jest.restoreAllMocks();
            });

            it('should return the pokemon with no moves at all', () => {
                expect(result).toEqual({
                    ...fakeRandemonPokemonWithOneType,
                    moves: []
                });
            });
        });
    });
});
