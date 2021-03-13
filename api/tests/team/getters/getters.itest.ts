import CacheService from '../../../src/cache/cacheService';
import { logger } from '../../../src/logger';
import { config } from '../../../src/config';
import Pokemon from '../../../src/randemon/models/pokemon';
import { getPokemonById } from '../../../src/team/getters';
import { pokemon110, pokemonPAPI110 } from './getters.fixtures';

import * as Fetch from '../../../src/team/fetch';

describe('Getters', () => {
    let cacheService: CacheService;

    beforeAll(() => {
        cacheService = new CacheService(
            CacheService.createRedisClient({
                host: config.REDIS_HOST_TEST,
                port: config.REDIS_PORT_TEST
            }),
            logger
        );
    });

    afterAll(async (done) => {
        await cacheService.disconnect();
        done();
    });

    afterEach(async (done) => {
        await cacheService.clear();
        done();
    });

    describe('::getPokemonById', () => {
        const fetchPokemonByNameOrIdMock = jest.spyOn(Fetch, 'fetchPokemonByNameOrId');
        fetchPokemonByNameOrIdMock.mockResolvedValue(pokemonPAPI110);

        describe('when the pokemon is in cache', () => {
            it('should return the pokemon without an http request', () => {
                cacheService.set('pokemon:id:110', JSON.stringify(pokemon110));
                getPokemonById(cacheService, 110).then((pokemon: Pokemon) => {
                    expect(fetchPokemonByNameOrIdMock).not.toHaveBeenCalled();
                    expect(pokemon).toEqual(pokemon110);
                });
            });
        });

        describe('if the pokemon is not in the cache', () => {
            it('should return the pokemon from an http request', () => {
                getPokemonById(cacheService, 110).then((pokemon: Pokemon) => {
                    expect(fetchPokemonByNameOrIdMock).toHaveBeenCalled();
                    expect(pokemon).toEqual(pokemon110);
                });
            });
        });
    });
});
