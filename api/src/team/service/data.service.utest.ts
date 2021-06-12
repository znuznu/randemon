import {
    fakeRandemonTypeFireIds,
    fakeRandemonTypeGrassIds,
    fakeRandemonTypeWaterIds
} from '../../../tests/fixtures/fakeRandemonFireTypeIds';
import { fakeRandemonMoveHyperBeam } from '../../../tests/fixtures/fakeRandemonMove';
import {
    fakeRandemonPokemonWithOneType,
    fakeRandemonPokemonWithSpeciesData
} from '../../../tests/fixtures/fakeRandemonPokemon';
import CacheAdapter from '../../adapter/cache/cacheAdapter';
import { HttpAdapter } from '../../adapter/pokeApi/httpAdapter';
import FakeCacheService from '../../core/cache/fakeCache.service';
import { createHttpService } from '../../core/http/mock';
import { loggerTest } from '../../logger';
import { Move } from '../../models/randemon/move';
import Pokemon from '../../models/randemon/pokemon';
import DataService from './data.service';

jest.mock('../../adapter/pokeApi/httpAdapter');
jest.mock('../../adapter/cache/cacheAdapter');

describe('DataService - unit', () => {
    describe('::getIdsOfPokemonWithType', () => {
        let cacheAdapter: CacheAdapter;
        let pokeApiAdapter: HttpAdapter;

        beforeEach(() => {
            cacheAdapter = new CacheAdapter(new FakeCacheService(loggerTest));
            pokeApiAdapter = new HttpAdapter(
                {
                    BASE_URL: 'http://some-url.com'
                },
                createHttpService({
                    get: { status: 200, json: fakeRandemonTypeFireIds }
                })
            );
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        describe('when the ids are in cache', () => {
            let result: number[];

            beforeEach(async () => {
                const dataService = new DataService(pokeApiAdapter, cacheAdapter);

                jest.spyOn(cacheAdapter, 'getAllPokemonIdsWithType').mockImplementation(
                    jest.fn(() => Promise.resolve(fakeRandemonTypeFireIds))
                );
                jest.spyOn(pokeApiAdapter, 'getAllPokemonIdsWithType');

                result = await dataService.getIdsOfPokemonWithType('FIRE');
            });

            afterEach(() => {
                jest.restoreAllMocks();
            });

            afterAll(() => jest.clearAllMocks());

            it('should call the cache adapter', () => {
                expect(cacheAdapter.getAllPokemonIdsWithType).toHaveBeenCalledWith(
                    'FIRE'
                );
            });

            it('should not call the PokéAPI adapter', () => {
                expect(pokeApiAdapter.getAllPokemonIdsWithType).not.toHaveBeenCalled();
            });

            it('should return the ids', () => {
                expect(result).toEqual([4, 5, 6, 37, 38, 58, 59, 77, 78, 126]);
            });
        });

        describe('when the ids are not in cache', () => {
            let result: number[];

            beforeEach(async () => {
                const dataService = new DataService(pokeApiAdapter, cacheAdapter);

                jest.spyOn(cacheAdapter, 'getAllPokemonIdsWithType').mockImplementation(
                    jest.fn(() => Promise.resolve(null))
                );
                jest.spyOn(pokeApiAdapter, 'getAllPokemonIdsWithType').mockImplementation(
                    jest.fn(() => Promise.resolve(fakeRandemonTypeFireIds))
                );

                result = await dataService.getIdsOfPokemonWithType('FIRE');
            });

            afterAll(() => jest.clearAllMocks());

            it('should call the cache adapter', () => {
                expect(cacheAdapter.getAllPokemonIdsWithType).toHaveBeenCalledWith(
                    'FIRE'
                );
                expect(cacheAdapter.setAllPokemonIdsWithType).toHaveBeenCalledWith(
                    'FIRE',
                    [4, 5, 6, 37, 38, 58, 59, 77, 78, 126]
                );
            });

            it('should call the PokéAPI adapter', () => {
                expect(pokeApiAdapter.getAllPokemonIdsWithType).toHaveBeenCalledWith(
                    'FIRE'
                );
            });

            it('should return the ids', () => {
                expect(result).toEqual([4, 5, 6, 37, 38, 58, 59, 77, 78, 126]);
            });
        });
    });

    describe('::getPokemonById', () => {
        let cacheAdapter: CacheAdapter;
        let pokeApiAdapter: HttpAdapter;

        beforeEach(() => {
            cacheAdapter = new CacheAdapter(new FakeCacheService(loggerTest));
            pokeApiAdapter = new HttpAdapter(
                {
                    BASE_URL: 'http://some-url.com'
                },
                createHttpService()
            );
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        describe('when the pokemon is in cache', () => {
            let result: Pokemon;

            beforeEach(async () => {
                const dataService = new DataService(pokeApiAdapter, cacheAdapter);

                jest.spyOn(cacheAdapter, 'getPokemonById').mockImplementation(
                    jest.fn(() => Promise.resolve(fakeRandemonPokemonWithSpeciesData))
                );
                jest.spyOn(pokeApiAdapter, 'getPokemon');
                jest.spyOn(pokeApiAdapter, 'getSpeciesData');

                result = await dataService.getPokemonById('6');
            });

            afterEach(() => {
                jest.restoreAllMocks();
            });

            afterAll(() => jest.clearAllMocks());

            it('should call the cache adapter', () => {
                expect(cacheAdapter.getPokemonById).toHaveBeenCalledWith('6');
            });

            it('should not call the PokéAPI adapter', () => {
                expect(pokeApiAdapter.getPokemon).not.toHaveBeenCalled();
                expect(pokeApiAdapter.getSpeciesData).not.toHaveBeenCalled();
            });

            it('should return the pokemon', () => {
                expect(result).toEqual({
                    id: 6,
                    names: {
                        english: 'charizard',
                        japanese: 'リザードン'
                    },
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

        describe('when the pokemon is not in cache', () => {
            let result: Pokemon;

            beforeEach(async () => {
                const dataService = new DataService(pokeApiAdapter, cacheAdapter);

                jest.spyOn(cacheAdapter, 'getPokemonById').mockImplementation(
                    jest.fn(() => Promise.resolve(null))
                );
                jest.spyOn(pokeApiAdapter, 'getPokemon').mockImplementation(
                    jest.fn(() => Promise.resolve(fakeRandemonPokemonWithOneType))
                );
                jest.spyOn(pokeApiAdapter, 'getSpeciesData').mockImplementation(
                    jest.fn(() => Promise.resolve(fakeRandemonPokemonWithSpeciesData))
                );

                result = await dataService.getPokemonById('6');
            });

            afterAll(() => jest.clearAllMocks());

            it('should call the cache adapter', () => {
                expect(cacheAdapter.getPokemonById).toHaveBeenCalledWith('6');
                expect(cacheAdapter.setPokemonById).toHaveBeenCalledWith('6', {
                    id: 6,
                    names: {
                        english: 'charizard',
                        japanese: 'リザードン'
                    },
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
                expect(cacheAdapter.setPokemonByName).toHaveBeenCalledWith('charizard', {
                    id: 6,
                    names: {
                        english: 'charizard',
                        japanese: 'リザードン'
                    },
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

            it('should call the PokéAPI adapter', () => {
                expect(pokeApiAdapter.getPokemon).toHaveBeenCalledWith('6');
            });

            it('should return the pokemon', () => {
                expect(result).toEqual({
                    id: 6,
                    names: {
                        english: 'charizard',
                        japanese: 'リザードン'
                    },
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
    });

    describe('::getMoveByName', () => {
        let cacheAdapter: CacheAdapter;
        let pokeApiAdapter: HttpAdapter;

        beforeEach(() => {
            cacheAdapter = new CacheAdapter(new FakeCacheService(loggerTest));
            pokeApiAdapter = new HttpAdapter(
                {
                    BASE_URL: 'http://some-url.com'
                },
                createHttpService({
                    get: { status: 200, json: fakeRandemonTypeFireIds }
                })
            );
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        describe('when the move is in cache', () => {
            let result: Move;

            beforeEach(async () => {
                const dataService = new DataService(pokeApiAdapter, cacheAdapter);

                jest.spyOn(cacheAdapter, 'getMoveByName').mockImplementation(
                    jest.fn(() => Promise.resolve(fakeRandemonMoveHyperBeam))
                );
                jest.spyOn(pokeApiAdapter, 'getMove');

                result = await dataService.getMoveByName('hyper-beam');
            });

            afterEach(() => {
                jest.restoreAllMocks();
            });

            afterAll(() => jest.clearAllMocks());

            it('should call the cache adapter', () => {
                expect(cacheAdapter.getMoveByName).toHaveBeenCalledWith('hyper-beam');
            });

            it('should not call the PokéAPI adapter', () => {
                expect(pokeApiAdapter.getMove).not.toHaveBeenCalled();
            });

            it('should return the move', () => {
                expect(result).toEqual({
                    accuracy: 90,
                    power: 150,
                    pp: 5,
                    type: 'NORMAL',
                    name: 'hyper-beam'
                });
            });
        });

        describe('when the move is not in cache', () => {
            let result: Move;

            beforeEach(async () => {
                const dataService = new DataService(pokeApiAdapter, cacheAdapter);

                jest.spyOn(cacheAdapter, 'getMoveByName').mockImplementation(
                    jest.fn(() => Promise.resolve(null))
                );
                jest.spyOn(pokeApiAdapter, 'getMove').mockImplementation(
                    jest.fn(() => Promise.resolve(fakeRandemonMoveHyperBeam))
                );

                result = await dataService.getMoveByName('hyper-beam');
            });

            afterEach(() => {
                jest.restoreAllMocks();
            });

            afterAll(() => jest.clearAllMocks());

            it('should call the cache adapter', () => {
                expect(cacheAdapter.getMoveByName).toHaveBeenCalledWith('hyper-beam');
            });

            it('should call the PokéAPI adapter', () => {
                expect(pokeApiAdapter.getMove).toHaveBeenCalledWith('hyper-beam');
            });

            it('should return the move', () => {
                expect(result).toEqual({
                    accuracy: 90,
                    power: 150,
                    pp: 5,
                    type: 'NORMAL',
                    name: 'hyper-beam'
                });
            });
        });
    });

    describe('::getIdsOfPokemonWithTypes', () => {
        let cacheAdapter: CacheAdapter;
        let pokeApiAdapter: HttpAdapter;
        let dataService: DataService;

        beforeEach(() => {
            cacheAdapter = new CacheAdapter(new FakeCacheService(loggerTest));
            pokeApiAdapter = new HttpAdapter(
                {
                    BASE_URL: 'http://some-url.com'
                },
                createHttpService({
                    get: { status: 200, json: fakeRandemonTypeFireIds }
                })
            );
            dataService = new DataService(pokeApiAdapter, cacheAdapter);
        });

        describe('when a single type is provided', () => {
            let result: number[];

            beforeEach(async () => {
                jest.spyOn(cacheAdapter, 'getAllPokemonIdsWithType').mockReturnValueOnce(
                    Promise.resolve(fakeRandemonTypeFireIds)
                );

                result = await dataService.getIdsOfPokemonWithTypes(['FIRE']);
            });

            afterEach(() => {
                jest.restoreAllMocks();
            });

            it('should return the ids of the type', () => {
                expect(result).toEqual([4, 5, 6, 37, 38, 58, 59, 77, 78, 126]);
            });
        });

        describe('when multiple types are provided', () => {
            let result: number[];

            beforeEach(async () => {
                jest.spyOn(dataService, 'getIdsOfPokemonWithType')
                    .mockReturnValueOnce(Promise.resolve(fakeRandemonTypeFireIds))
                    .mockReturnValueOnce(Promise.resolve(fakeRandemonTypeWaterIds))
                    .mockReturnValueOnce(Promise.resolve(fakeRandemonTypeGrassIds));

                result = await dataService.getIdsOfPokemonWithTypes([
                    'FIRE',
                    'WATER',
                    'GRASS'
                ]);
            });

            afterEach(() => {
                jest.restoreAllMocks();
            });

            it('should return a merge of all ids', () => {
                expect(result).toEqual([
                    4,
                    5,
                    6,
                    37,
                    38,
                    58,
                    59,
                    77,
                    78,
                    126,
                    200,
                    201,
                    203,
                    205,
                    206,
                    210,
                    258,
                    299,
                    300,
                    301,
                    303,
                    305,
                    306,
                    310,
                    358,
                    399
                ]);
            });
        });
    });
});
