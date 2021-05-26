import {
    fakeRandemonTypeFireIds,
    fakeRandemonTypeGrassIds,
    fakeRandemonTypeWaterIds
} from '../../../tests/fixtures/fakeRandemonFireTypeIds';
import CacheConnector from '../../connector/cache/cacheConnector';
import FakeCacheService from '../../core/cache/fakeCache.service';
import { HttpConnector } from '../../connector/pokeApi/httpConnector';
import { createHttpService } from '../../core/http/mock';
import { loggerTest } from '../../logger';
import CreateTeamRandomlyResolver from './resolver';
import DataService from '../service/data.service';
import Pokemon from '../../models/randemon/pokemon';
import { fakeRandemonPokemonWithOneType } from '../../../tests/fixtures/fakeRandemonPokemon';
import {
    fakeRandemonMoveEmber,
    fakeRandemonMoveHyperBeam,
    fakeRandemonMoveMegaPunch,
    fakeRandemonMoveScratch
} from '../../../tests/fixtures/fakeRandemonMove';
import TeamService from '../service/team.service';

jest.mock('../service/data.service');
jest.mock('../service/team.service');

describe('CreateTeamRandomlyResolver - unit', () => {
    describe('::getPokemonWithRandomMoves', () => {
        let cacheConnector: CacheConnector;
        let pokeApiConnector: HttpConnector;
        let dataService: DataService;

        beforeEach(() => {
            cacheConnector = new CacheConnector(new FakeCacheService(loggerTest));
            pokeApiConnector = new HttpConnector(
                {
                    BASE_URL: 'http://some-url.com'
                },
                createHttpService({
                    get: { status: 200, json: fakeRandemonPokemonWithOneType }
                })
            );
            dataService = new DataService(pokeApiConnector, cacheConnector);
        });

        describe('when the pokemon has at least 4 moves', () => {
            let result: Pokemon;

            beforeEach(async () => {
                const resolver = new CreateTeamRandomlyResolver(dataService);

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
                const resolver = new CreateTeamRandomlyResolver(dataService);

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
                const resolver = new CreateTeamRandomlyResolver(dataService);

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
