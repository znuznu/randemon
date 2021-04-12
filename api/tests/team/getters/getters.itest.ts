import CacheService from '../../../src/cache/cacheService';
import { loggerTest } from '../../../src/logger';
import { config } from '../../../src/config';
import Pokemon from '../../../src/randemon/models/pokemon';
import {
    getMoveByName,
    getPokemonById,
    getPokemonNamedAPIResourceOfTypeByName
} from '../../../src/team/getters';
import {
    moveHyperBeam,
    movePAPIHyperBeam,
    pokemon110,
    pokemonPAPI110,
    typePokemonPAPIFire
} from './getters.fixture';

import * as Fetch from '../../../src/team/fetch';
import { Move } from '../../../src/randemon/models/move';
import { TypePokemonPAPI } from '../../../src/pokeapi/models/type.papi';

describe('Getters', () => {
    let cacheService: CacheService;

    beforeAll(() => {
        cacheService = new CacheService(
            CacheService.createRedisClient({
                host: config.REDIS_URL_TEST,
                port: config.REDIS_PORT_TEST
            }),
            loggerTest
        );
    });

    afterAll(async () => {
        await cacheService.disconnect();
    });

    describe('::getPokemonById', () => {
        const fetchPokemonMock = jest.spyOn(Fetch, 'fetchPokemon');
        fetchPokemonMock.mockResolvedValue(pokemonPAPI110);

        describe('when the pokemon is not in the cache', () => {
            let pokemonFromCache: string | null;
            let pokemon: Pokemon;

            afterAll(async () => {
                fetchPokemonMock.mockClear();
                await cacheService.clear();
            });

            it('should return the pokemon from an http request', async () => {
                pokemon = await getPokemonById(cacheService, 110);
                expect(fetchPokemonMock).toHaveBeenCalled();
                expect(pokemon).toEqual(pokemon110);
            });

            it('should have set the pokemon in cache with id as key', async () => {
                pokemonFromCache = await cacheService.get('pokemon:id:110');
                expect(pokemonFromCache).not.toBeNull();
                expect(JSON.parse(pokemonFromCache!)).toEqual(pokemon110);
            });

            it('should have set the pokemon in cache with name as key', async () => {
                pokemonFromCache = await cacheService.get(`pokemon:name:${pokemon.name}`);
                expect(pokemonFromCache).not.toBeNull();
                expect(JSON.parse(pokemonFromCache!)).toEqual(pokemon110);
            });
        });

        describe('when the pokemon is in cache', () => {
            afterAll(async () => {
                fetchPokemonMock.mockClear();
                await cacheService.clear();
            });

            it('should return the pokemon without an http request', async () => {
                await cacheService.set('pokemon:id:110', JSON.stringify(pokemon110));
                return getPokemonById(cacheService, 110).then((pokemon: Pokemon) => {
                    expect(fetchPokemonMock).not.toHaveBeenCalled();
                    expect(pokemon).toEqual(pokemon110);
                });
            });
        });
    });

    describe('::getMoveByName', () => {
        const fetchMoveMock = jest.spyOn(Fetch, 'fetchMove');
        fetchMoveMock.mockResolvedValue(movePAPIHyperBeam);

        describe('when the move is not in the cache', () => {
            let moveFromCache: string | null;

            afterAll(async () => {
                fetchMoveMock.mockClear();
                await cacheService.clear();
            });

            it('should return the move from an http request', async () => {
                const move = await getMoveByName(cacheService, 'hyper-beam');
                expect(fetchMoveMock).toHaveBeenCalled();
                expect(move).toEqual(moveHyperBeam);
            });

            it('should have set the move in cache with name as key', async () => {
                moveFromCache = await cacheService.get('move:name:hyper-beam');
                expect(moveFromCache).not.toBeNull();
                expect(JSON.parse(moveFromCache!)).toEqual(moveHyperBeam);
            });
        });

        describe('when the move is in cache', () => {
            afterAll(async () => {
                fetchMoveMock.mockClear();
                await cacheService.clear();
            });

            it('should return the move without an http request', () => {
                cacheService.set('move:name:hyper-beam', JSON.stringify(moveHyperBeam));
                getMoveByName(cacheService, 'hyper-beam').then((move: Move) => {
                    expect(fetchMoveMock).not.toHaveBeenCalled();
                    expect(move).toEqual(moveHyperBeam);
                });
            });
        });
    });

    describe('::getPokemonNamedAPIResourceOfTypeByName', () => {
        const fetchTypePokemonPAPIByType = jest.spyOn(
            Fetch,
            'fetchTypePokemonPAPIByType'
        );
        fetchTypePokemonPAPIByType.mockResolvedValue(typePokemonPAPIFire);

        describe('when the type is not in the cache', () => {
            let typeFromCache: string | null;

            afterAll(async () => {
                fetchTypePokemonPAPIByType.mockClear();
                await cacheService.clear();
            });

            it('should return the pokemon with the given type from an http request', async () => {
                const type = await getPokemonNamedAPIResourceOfTypeByName(
                    cacheService,
                    'FIRE'
                );
                expect(fetchTypePokemonPAPIByType).toHaveBeenCalled();
                expect(type).toEqual(typePokemonPAPIFire);
            });

            it('should have set the pokemon with the given type in cache with name as key', async () => {
                typeFromCache = await cacheService.get('type:pokemon:FIRE');
                expect(typeFromCache).not.toBeNull();
                expect(JSON.parse(typeFromCache!)).toEqual(typePokemonPAPIFire);
            });
        });

        describe('when the type is in cache', () => {
            afterAll(async () => {
                fetchTypePokemonPAPIByType.mockClear();
                await cacheService.clear();
            });

            it('should return the pokemon with the given type without an http request', () => {
                cacheService.set(
                    'type:pokemon:FIRE',
                    JSON.stringify(typePokemonPAPIFire)
                );
                getPokemonNamedAPIResourceOfTypeByName(cacheService, 'FIRE').then(
                    (type: TypePokemonPAPI[]) => {
                        expect(fetchTypePokemonPAPIByType).not.toHaveBeenCalled();
                        expect(type).toEqual(typePokemonPAPIFire);
                    }
                );
            });
        });
    });
});
