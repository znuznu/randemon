import CacheService from '../../../src/cache/cacheService';
import { loggerTest } from '../../../src/logger';
import { config } from '../../../src/config';
import Pokemon from '../../../src/randemon/models/pokemon';
import { getMoveByName, getPokemonById } from '../../../src/team/getters';
import {
    moveHyperBeam,
    movePAPIHyperBeam,
    pokemon110,
    pokemonPAPI110
} from './getters.fixture';

import * as Fetch from '../../../src/team/fetch';
import { Move } from '../../../src/randemon/models/move';

describe('Getters', () => {
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
        fetchPokemonMock.mockResolvedValue(pokemonPAPI110);

        describe('if the pokemon is not in the cache', () => {
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

        describe('if the move is not in the cache', () => {
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
});
