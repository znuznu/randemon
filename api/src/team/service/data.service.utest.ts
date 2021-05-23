import {
    fakeRandemonTypeFireIds,
    fakeRandemonTypeGrassIds,
    fakeRandemonTypeWaterIds
} from '../../../tests/fixtures/fakeRandemonFireTypeIds';
import { fakeRandemonMoveHyperBeam } from '../../../tests/fixtures/fakeRandemonMove';
import { fakeRandemonPokemonWithOneType } from '../../../tests/fixtures/fakeRandemonPokemon';
import CacheConnector from '../../connector/cache/cacheConnector';
import { HttpConnector } from '../../connector/pokeApi/httpConnector';
import FakeCacheService from '../../core/cache/fakeCache.service';
import { createHttpService } from '../../core/http/mock';
import { loggerTest } from '../../logger';
import { Move } from '../../models/randemon/move';
import Pokemon from '../../models/randemon/pokemon';
import DataService from './data.service';

jest.mock('../../connector/pokeApi/httpConnector');
jest.mock('../../connector/cache/cacheConnector');

describe('DataService - unit', () => {
    describe('::getIdsOfPokemonWithType', () => {
        let cacheConnector: CacheConnector;
        let pokeApiConnector: HttpConnector;

        beforeEach(() => {
            cacheConnector = new CacheConnector(new FakeCacheService(loggerTest));
            pokeApiConnector = new HttpConnector(
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
                const dataService = new DataService(pokeApiConnector, cacheConnector);

                jest.spyOn(cacheConnector, 'getAllPokemonIdsWithType').mockImplementation(
                    jest.fn(() => Promise.resolve(fakeRandemonTypeFireIds))
                );
                jest.spyOn(pokeApiConnector, 'getAllPokemonIdsWithType');

                result = await dataService.getIdsOfPokemonWithType('FIRE');
            });

            afterEach(() => {
                jest.restoreAllMocks();
            });

            afterAll(() => jest.clearAllMocks());

            it('should call the cache connector', () => {
                expect(cacheConnector.getAllPokemonIdsWithType).toHaveBeenCalledWith(
                    'FIRE'
                );
            });

            it('should not call the PokéAPI connector', () => {
                expect(pokeApiConnector.getAllPokemonIdsWithType).not.toHaveBeenCalled();
            });

            it('should return the ids', () => {
                expect(result).toEqual([4, 5, 6, 37, 38, 58, 59, 77, 78, 126]);
            });
        });

        describe('when the ids are not in cache', () => {
            let result: number[];

            beforeEach(async () => {
                const dataService = new DataService(pokeApiConnector, cacheConnector);

                jest.spyOn(cacheConnector, 'getAllPokemonIdsWithType').mockImplementation(
                    jest.fn(() => Promise.resolve(null))
                );
                jest.spyOn(
                    pokeApiConnector,
                    'getAllPokemonIdsWithType'
                ).mockImplementation(
                    jest.fn(() => Promise.resolve(fakeRandemonTypeFireIds))
                );

                result = await dataService.getIdsOfPokemonWithType('FIRE');
            });

            afterAll(() => jest.clearAllMocks());

            it('should call the cache connector', () => {
                expect(cacheConnector.getAllPokemonIdsWithType).toHaveBeenCalledWith(
                    'FIRE'
                );
                expect(
                    cacheConnector.setAllPokemonIdsWithType
                ).toHaveBeenCalledWith('FIRE', [4, 5, 6, 37, 38, 58, 59, 77, 78, 126]);
            });

            it('should call the PokéAPI connector', () => {
                expect(pokeApiConnector.getAllPokemonIdsWithType).toHaveBeenCalledWith(
                    'FIRE'
                );
            });

            it('should return the ids', () => {
                expect(result).toEqual([4, 5, 6, 37, 38, 58, 59, 77, 78, 126]);
            });
        });
    });

    describe('::getPokemonById', () => {
        let cacheConnector: CacheConnector;
        let pokeApiConnector: HttpConnector;

        beforeEach(() => {
            cacheConnector = new CacheConnector(new FakeCacheService(loggerTest));
            pokeApiConnector = new HttpConnector(
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

        describe('when the pokemon is in cache', () => {
            let result: Pokemon;

            beforeEach(async () => {
                const dataService = new DataService(pokeApiConnector, cacheConnector);

                jest.spyOn(cacheConnector, 'getPokemonById').mockImplementation(
                    jest.fn(() => Promise.resolve(fakeRandemonPokemonWithOneType))
                );
                jest.spyOn(pokeApiConnector, 'getPokemon');

                result = await dataService.getPokemonById('6');
            });

            afterEach(() => {
                jest.restoreAllMocks();
            });

            afterAll(() => jest.clearAllMocks());

            it('should call the cache connector', () => {
                expect(cacheConnector.getPokemonById).toHaveBeenCalledWith('6');
            });

            it('should not call the PokéAPI connector', () => {
                expect(pokeApiConnector.getPokemon).not.toHaveBeenCalled();
            });

            it('should return the move', () => {
                expect(result).toEqual({
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

        describe('when the pokemon is not in cache', () => {
            let result: Pokemon;

            beforeEach(async () => {
                const dataService = new DataService(pokeApiConnector, cacheConnector);

                jest.spyOn(cacheConnector, 'getPokemonById').mockImplementation(
                    jest.fn(() => Promise.resolve(null))
                );
                jest.spyOn(pokeApiConnector, 'getPokemon').mockImplementation(
                    jest.fn(() => Promise.resolve(fakeRandemonPokemonWithOneType))
                );

                result = await dataService.getPokemonById('6');
            });

            afterAll(() => jest.clearAllMocks());

            it('should call the cache connector', () => {
                expect(cacheConnector.getPokemonById).toHaveBeenCalledWith('6');
                expect(cacheConnector.setPokemonById).toHaveBeenCalledWith('6', {
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
                expect(cacheConnector.setPokemonByName).toHaveBeenCalledWith(
                    'charizard',
                    {
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
                    }
                );
            });

            it('should call the PokéAPI connector', () => {
                expect(pokeApiConnector.getPokemon).toHaveBeenCalledWith('6');
            });

            it('should return the pokemon', () => {
                expect(result).toEqual({
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
    });

    describe('::getMoveByName', () => {
        let cacheConnector: CacheConnector;
        let pokeApiConnector: HttpConnector;

        beforeEach(() => {
            cacheConnector = new CacheConnector(new FakeCacheService(loggerTest));
            pokeApiConnector = new HttpConnector(
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
                const dataService = new DataService(pokeApiConnector, cacheConnector);

                jest.spyOn(cacheConnector, 'getMoveByName').mockImplementation(
                    jest.fn(() => Promise.resolve(fakeRandemonMoveHyperBeam))
                );
                jest.spyOn(pokeApiConnector, 'getMove');

                result = await dataService.getMoveByName('hyper-beam');
            });

            afterEach(() => {
                jest.restoreAllMocks();
            });

            afterAll(() => jest.clearAllMocks());

            it('should call the cache connector', () => {
                expect(cacheConnector.getMoveByName).toHaveBeenCalledWith('hyper-beam');
            });

            it('should not call the PokéAPI connector', () => {
                expect(pokeApiConnector.getMove).not.toHaveBeenCalled();
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
                const dataService = new DataService(pokeApiConnector, cacheConnector);

                jest.spyOn(cacheConnector, 'getMoveByName').mockImplementation(
                    jest.fn(() => Promise.resolve(null))
                );
                jest.spyOn(pokeApiConnector, 'getMove').mockImplementation(
                    jest.fn(() => Promise.resolve(fakeRandemonMoveHyperBeam))
                );

                result = await dataService.getMoveByName('hyper-beam');
            });

            afterEach(() => {
                jest.restoreAllMocks();
            });

            afterAll(() => jest.clearAllMocks());

            it('should call the cache connector', () => {
                expect(cacheConnector.getMoveByName).toHaveBeenCalledWith('hyper-beam');
            });

            it('should call the PokéAPI connector', () => {
                expect(pokeApiConnector.getMove).toHaveBeenCalledWith('hyper-beam');
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
                    get: { status: 200, json: fakeRandemonTypeFireIds }
                })
            );
            dataService = new DataService(pokeApiConnector, cacheConnector);
        });

        describe('when a single type is provided', () => {
            let result: number[];

            beforeEach(async () => {
                jest.spyOn(
                    cacheConnector,
                    'getAllPokemonIdsWithType'
                ).mockReturnValueOnce(Promise.resolve(fakeRandemonTypeFireIds));

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
