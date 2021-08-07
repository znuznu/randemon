import {
    fakeRandemonTypeFireIds,
    fakeRandemonTypeGrassIds,
    fakeRandemonTypeWaterIds
} from '../../../../tests/fixtures/fakeRandemonFireTypeIds';
import { fakeRandemonMoveHyperBeam } from '../../../../tests/fixtures/fakeRandemonMove';
import {
    fakeRandemonPokemonWithOneType,
    fakeRandemonPokemonWithSpeciesData
} from '../../../../tests/fixtures/fakeRandemonPokemon';
import InMemoryCacheService from '../../../infrastructure/services/cache/inMemoryCache.service';
import { createHttpService } from '../../../infrastructure/http/mock';
import { loggerTest } from '../../../infrastructure/services/logger';
import { Move } from '../../models/move';
import Pokemon from '../../models/pokemon';
import DataService from './data.service';
import HttpPokeApiRepository from '../../../infrastructure/pokeApi/httpPokeApiRepository';
import PokemonRepository from '../../ports/pokemonRepository';
import CachePokemonRepository from '../../../infrastructure/cache/cachePokemonRepository';

jest.mock('../../../infrastructure/pokeApi/httpPokeApiRepository');
jest.mock('../../../infrastructure/cache/cachePokemonRepository');

describe('DataService - unit', () => {
    describe('::getIdsOfPokemonWithType', () => {
        let pokemonRepository: PokemonRepository;
        let pokeApiRepository: HttpPokeApiRepository;

        beforeEach(() => {
            pokemonRepository = new CachePokemonRepository(new InMemoryCacheService(loggerTest));
            pokeApiRepository = new HttpPokeApiRepository(
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
                const dataService = new DataService(pokeApiRepository, pokemonRepository);

                jest.spyOn(pokemonRepository, 'getAllPokemonIdsWithType').mockImplementation(
                    jest.fn(() => Promise.resolve(fakeRandemonTypeFireIds))
                );
                jest.spyOn(pokeApiRepository, 'getAllPokemonIdsWithType');

                result = await dataService.getIdsOfPokemonWithType('FIRE');
            });

            afterEach(() => {
                jest.restoreAllMocks();
            });

            afterAll(() => jest.clearAllMocks());

            it('should call the cache adapter', () => {
                expect(pokemonRepository.getAllPokemonIdsWithType).toHaveBeenCalledWith(
                    'FIRE'
                );
            });

            it('should not call the PokéAPI adapter', () => {
                expect(pokeApiRepository.getAllPokemonIdsWithType).not.toHaveBeenCalled();
            });

            it('should return the ids', () => {
                expect(result).toEqual([4, 5, 6, 37, 38, 58, 59, 77, 78, 126]);
            });
        });

        describe('when the ids are not in cache', () => {
            let result: number[];

            beforeEach(async () => {
                const dataService = new DataService(pokeApiRepository, pokemonRepository);

                jest.spyOn(pokemonRepository, 'getAllPokemonIdsWithType').mockImplementation(
                    jest.fn(() => Promise.resolve(null))
                );
                jest.spyOn(pokeApiRepository, 'getAllPokemonIdsWithType').mockImplementation(
                    jest.fn(() => Promise.resolve(fakeRandemonTypeFireIds))
                );

                result = await dataService.getIdsOfPokemonWithType('FIRE');
            });

            afterAll(() => jest.clearAllMocks());

            it('should call the cache adapter', () => {
                expect(pokemonRepository.getAllPokemonIdsWithType).toHaveBeenCalledWith(
                    'FIRE'
                );
                expect(pokemonRepository.setAllPokemonIdsWithType).toHaveBeenCalledWith(
                    'FIRE',
                    [4, 5, 6, 37, 38, 58, 59, 77, 78, 126]
                );
            });

            it('should call the PokéAPI adapter', () => {
                expect(pokeApiRepository.getAllPokemonIdsWithType).toHaveBeenCalledWith(
                    'FIRE'
                );
            });

            it('should return the ids', () => {
                expect(result).toEqual([4, 5, 6, 37, 38, 58, 59, 77, 78, 126]);
            });
        });
    });

    describe('::getPokemonById', () => {
        let pokemonRepository: CachePokemonRepository;
        let pokeApiRepository: HttpPokeApiRepository;

        beforeEach(() => {
            pokemonRepository = new CachePokemonRepository(new InMemoryCacheService(loggerTest));
            pokeApiRepository = new HttpPokeApiRepository(
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
                const dataService = new DataService(pokeApiRepository, pokemonRepository);

                jest.spyOn(pokemonRepository, 'getPokemonById').mockImplementation(
                    jest.fn(() => Promise.resolve(fakeRandemonPokemonWithSpeciesData))
                );
                jest.spyOn(pokeApiRepository, 'getPokemon');
                jest.spyOn(pokeApiRepository, 'getSpeciesData');

                result = await dataService.getPokemonById('6');
            });

            afterEach(() => {
                jest.restoreAllMocks();
            });

            afterAll(() => jest.clearAllMocks());

            it('should call the cache adapter', () => {
                expect(pokemonRepository.getPokemonById).toHaveBeenCalledWith('6');
            });

            it('should not call the PokéAPI adapter', () => {
                expect(pokeApiRepository.getPokemon).not.toHaveBeenCalled();
                expect(pokeApiRepository.getSpeciesData).not.toHaveBeenCalled();
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
                const dataService = new DataService(pokeApiRepository, pokemonRepository);

                jest.spyOn(pokemonRepository, 'getPokemonById').mockImplementation(
                    jest.fn(() => Promise.resolve(null))
                );
                jest.spyOn(pokeApiRepository, 'getPokemon').mockImplementation(
                    jest.fn(() => Promise.resolve(fakeRandemonPokemonWithOneType))
                );
                jest.spyOn(pokeApiRepository, 'getSpeciesData').mockImplementation(
                    jest.fn(() => Promise.resolve(fakeRandemonPokemonWithSpeciesData))
                );

                result = await dataService.getPokemonById('6');
            });

            afterAll(() => jest.clearAllMocks());

            it('should call the cache adapter', () => {
                expect(pokemonRepository.getPokemonById).toHaveBeenCalledWith('6');
                expect(pokemonRepository.setPokemonById).toHaveBeenCalledWith('6', {
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
                expect(pokemonRepository.setPokemonByName).toHaveBeenCalledWith('charizard', {
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
                expect(pokeApiRepository.getPokemon).toHaveBeenCalledWith('6');
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
        let pokemonRepository: CachePokemonRepository;
        let pokeApiRepository: HttpPokeApiRepository;

        beforeEach(() => {
            pokemonRepository = new CachePokemonRepository(new InMemoryCacheService(loggerTest));
            pokeApiRepository = new HttpPokeApiRepository(
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
                const dataService = new DataService(pokeApiRepository, pokemonRepository);

                jest.spyOn(pokemonRepository, 'getMoveByName').mockImplementation(
                    jest.fn(() => Promise.resolve(fakeRandemonMoveHyperBeam))
                );
                jest.spyOn(pokeApiRepository, 'getMove');

                result = await dataService.getMoveByName('hyper-beam');
            });

            afterEach(() => {
                jest.restoreAllMocks();
            });

            afterAll(() => jest.clearAllMocks());

            it('should call the cache adapter', () => {
                expect(pokemonRepository.getMoveByName).toHaveBeenCalledWith('hyper-beam');
            });

            it('should not call the PokéAPI adapter', () => {
                expect(pokeApiRepository.getMove).not.toHaveBeenCalled();
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
                const dataService = new DataService(pokeApiRepository, pokemonRepository);

                jest.spyOn(pokemonRepository, 'getMoveByName').mockImplementation(
                    jest.fn(() => Promise.resolve(null))
                );
                jest.spyOn(pokeApiRepository, 'getMove').mockImplementation(
                    jest.fn(() => Promise.resolve(fakeRandemonMoveHyperBeam))
                );

                result = await dataService.getMoveByName('hyper-beam');
            });

            afterEach(() => {
                jest.restoreAllMocks();
            });

            afterAll(() => jest.clearAllMocks());

            it('should call the cache adapter', () => {
                expect(pokemonRepository.getMoveByName).toHaveBeenCalledWith('hyper-beam');
            });

            it('should call the PokéAPI adapter', () => {
                expect(pokeApiRepository.getMove).toHaveBeenCalledWith('hyper-beam');
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
        let pokemonRepository: CachePokemonRepository;
        let pokeApiRepository: HttpPokeApiRepository;
        let dataService: DataService;

        beforeEach(() => {
            pokemonRepository = new CachePokemonRepository(new InMemoryCacheService(loggerTest));
            pokeApiRepository = new HttpPokeApiRepository(
                {
                    BASE_URL: 'http://some-url.com'
                },
                createHttpService({
                    get: { status: 200, json: fakeRandemonTypeFireIds }
                })
            );
            dataService = new DataService(pokeApiRepository, pokemonRepository);
        });

        describe('when a single type is provided', () => {
            let result: number[];

            beforeEach(async () => {
                jest.spyOn(pokemonRepository, 'getAllPokemonIdsWithType').mockReturnValueOnce(
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
