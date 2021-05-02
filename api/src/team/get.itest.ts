import CacheService from '../cache/cacheService';
import { loggerTest } from '../logger';
import { config } from '../config';
import Pokemon from '../randemon/models/pokemon';
import {
    getMoveByName,
    getPokemonById,
    getPokemonNamedAPIResourceOfTypeByName
} from './get';
import * as Fetch from './fetch';
import { Move } from '../randemon/models/move';
import { TypePokemonPAPI } from '../pokeapi/models/type';
import { fakePokemonAPIMoveHyperBeam } from '../../tests/fixtures/fakePokemonAPIMove';
import { fakeRandemonMoveHyperBeam } from '../../tests/fixtures/fakeRandemonMove';
import { fakePokemonAPIPokemon110 } from '../../tests/fixtures/fakePokemonAPIPokemon';
import { fakeRandemonPokemon110 } from '../../tests/fixtures/fakeRandemonPokemon';
import { fakePokemonAPITypeFire } from '../../tests/fixtures/fakePokemonAPIType';

describe('Get - integration', () => {
    let cacheService: CacheService;

    beforeAll(() => {
        cacheService = new CacheService(
            CacheService.createRedisClient({
                host: config.REDIS_HOST_TEST,
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
        fetchPokemonMock.mockResolvedValue(fakePokemonAPIPokemon110);

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
                expect(pokemon).toEqual(fakeRandemonPokemon110);
            });

            it('should have set the pokemon in cache with id as key', async () => {
                pokemonFromCache = await cacheService.get('pokemon:id:110');
                expect(pokemonFromCache).not.toBeNull();
                expect(JSON.parse(pokemonFromCache!)).toEqual(fakeRandemonPokemon110);
            });

            it('should have set the pokemon in cache with name as key', async () => {
                pokemonFromCache = await cacheService.get(`pokemon:name:${pokemon.name}`);
                expect(pokemonFromCache).not.toBeNull();
                expect(JSON.parse(pokemonFromCache!)).toEqual(fakeRandemonPokemon110);
            });
        });

        describe('when the pokemon is in cache', () => {
            afterAll(async () => {
                fetchPokemonMock.mockClear();
                await cacheService.clear();
            });

            it('should return the pokemon without an http request', async () => {
                await cacheService.set(
                    'pokemon:id:110',
                    JSON.stringify(fakeRandemonPokemon110)
                );
                return getPokemonById(cacheService, 110).then((pokemon: Pokemon) => {
                    expect(fetchPokemonMock).not.toHaveBeenCalled();
                    expect(pokemon).toEqual(fakeRandemonPokemon110);
                });
            });
        });
    });

    describe('::getMoveByName', () => {
        const fetchMoveMock = jest.spyOn(Fetch, 'fetchMove');
        fetchMoveMock.mockResolvedValue(fakePokemonAPIMoveHyperBeam);

        describe('when the move is not in the cache', () => {
            let moveFromCache: string | null;

            afterAll(async () => {
                fetchMoveMock.mockClear();
                await cacheService.clear();
            });

            it('should return the move from an http request', async () => {
                const move = await getMoveByName(cacheService, 'hyper-beam');
                expect(fetchMoveMock).toHaveBeenCalled();
                expect(move).toEqual(fakeRandemonMoveHyperBeam);
            });

            it('should have set the move in cache with name as key', async () => {
                moveFromCache = await cacheService.get('move:name:hyper-beam');
                expect(moveFromCache).not.toBeNull();
                expect(JSON.parse(moveFromCache!)).toEqual(fakeRandemonMoveHyperBeam);
            });
        });

        describe('when the move is in cache', () => {
            afterAll(async () => {
                fetchMoveMock.mockClear();
                await cacheService.clear();
            });

            it('should return the move without an http request', () => {
                cacheService.set(
                    'move:name:hyper-beam',
                    JSON.stringify(fakeRandemonMoveHyperBeam)
                );
                getMoveByName(cacheService, 'hyper-beam').then((move: Move) => {
                    expect(fetchMoveMock).not.toHaveBeenCalled();
                    expect(move).toEqual(fakeRandemonMoveHyperBeam);
                });
            });
        });
    });

    describe('::getPokemonNamedAPIResourceOfTypeByName', () => {
        const fetchTypePokemonPAPIByType = jest.spyOn(
            Fetch,
            'fetchTypePokemonPAPIByType'
        );
        fetchTypePokemonPAPIByType.mockResolvedValue(fakePokemonAPITypeFire);

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
                expect(type).toEqual(fakePokemonAPITypeFire);
            });

            it('should have set the pokemon with the given type in cache with name as key', async () => {
                typeFromCache = await cacheService.get('type:pokemon:FIRE');
                expect(typeFromCache).not.toBeNull();
                expect(JSON.parse(typeFromCache!)).toEqual(fakePokemonAPITypeFire);
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
                    JSON.stringify(fakePokemonAPITypeFire)
                );
                getPokemonNamedAPIResourceOfTypeByName(cacheService, 'FIRE').then(
                    (type: TypePokemonPAPI[]) => {
                        expect(fetchTypePokemonPAPIByType).not.toHaveBeenCalled();
                        expect(type).toEqual(fakePokemonAPITypeFire);
                    }
                );
            });
        });
    });
});
