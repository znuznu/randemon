import InMemoryCacheService from '../services/cache/inMemoryCache.service';
import { fakeRandemonPokemonWithOneType } from '../../../tests/fixtures/fakeRandemonPokemon';
import { loggerTest } from '../services/logger';
import CacheAdapter from './cachePokemonRepository';
import Pokemon from '../../domain/models/pokemon';
import { fakeRandemonTypeFireIds } from '../../../tests/fixtures/fakeRandemonFireTypeIds';
import { Move } from '../../domain/models/move';
import { fakeRandemonMoveHyperBeam } from '../../../tests/fixtures/fakeRandemonMove';

describe('CachePokemonRepository - unit', () => {
    describe('::getPokemonByName', () => {
        describe('when the Pokemon is in cache', () => {
            const cacheService = new InMemoryCacheService(loggerTest);
            let result: Pokemon | null;

            beforeEach(async () => {
                let adapter: CacheAdapter = new CacheAdapter(cacheService);

                await cacheService.set(
                    'pokemon:name:charizard',
                    JSON.stringify(fakeRandemonPokemonWithOneType)
                );

                result = await adapter.getPokemonByName('charizard');
            });

            afterAll(async () => {
                await cacheService.clear();
                await cacheService.disconnect();
            });

            it('should return the Pokemon', () => {
                expect(result).toEqual({
                    id: 6,
                    names: {
                        english: 'charizard'
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

        describe('when the Pokemon is not in cache', () => {
            const cacheService = new InMemoryCacheService(loggerTest);
            let result: Pokemon | null;

            beforeEach(async () => {
                let adapter: CacheAdapter = new CacheAdapter(cacheService);

                result = await adapter.getPokemonByName('charizard');
            });

            afterAll(async () => {
                await cacheService.disconnect();
            });

            it('should return null', () => {
                expect(result).toBeNull();
            });
        });
    });

    describe('::setPokemonByName', () => {
        describe('when the Pokemon has been set in cache', () => {
            const cacheService = new InMemoryCacheService(loggerTest);

            beforeEach(async () => {
                let adapter: CacheAdapter = new CacheAdapter(cacheService);

                await adapter.setPokemonByName(
                    'charizard',
                    fakeRandemonPokemonWithOneType
                );
            });

            afterAll(async () => {
                await cacheService.clear();
                await cacheService.disconnect();
            });

            it('should return the Pokemon', async () => {
                expect(cacheService.get('pokemon:name:charizard')).resolves.toEqual(
                    JSON.stringify({
                        id: 6,
                        names: {
                            english: 'charizard'
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
                    })
                );
            });
        });
    });

    describe('::getPokemonById', () => {
        describe('when the Pokemon is in cache', () => {
            const cacheService = new InMemoryCacheService(loggerTest);
            let result: Pokemon | null;

            beforeEach(async () => {
                let adapter: CacheAdapter = new CacheAdapter(cacheService);

                await cacheService.set(
                    'pokemon:id:6',
                    JSON.stringify(fakeRandemonPokemonWithOneType)
                );

                result = await adapter.getPokemonById('6');
            });

            afterAll(async () => {
                await cacheService.clear();
                await cacheService.disconnect();
            });

            it('should return the Pokemon', () => {
                expect(result).toEqual({
                    id: 6,
                    names: {
                        english: 'charizard'
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

        describe('when the Pokemon is not in cache', () => {
            const cacheService = new InMemoryCacheService(loggerTest);
            let result: Pokemon | null;

            beforeEach(async () => {
                let adapter: CacheAdapter = new CacheAdapter(cacheService);

                result = await adapter.getPokemonById('6');
            });

            afterAll(async () => {
                await cacheService.disconnect();
            });

            it('should return null', () => {
                expect(result).toBeNull();
            });
        });
    });

    describe('::setPokemonById', () => {
        describe('when the Pokemon has been set in cache', () => {
            const cacheService = new InMemoryCacheService(loggerTest);

            beforeEach(async () => {
                let adapter: CacheAdapter = new CacheAdapter(cacheService);

                await adapter.setPokemonById('6', fakeRandemonPokemonWithOneType);
            });

            afterAll(async () => {
                await cacheService.clear();
                await cacheService.disconnect();
            });

            it('should return the Pokemon', async () => {
                expect(cacheService.get('pokemon:id:6')).resolves.toEqual(
                    JSON.stringify({
                        id: 6,
                        names: {
                            english: 'charizard'
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
                    })
                );
            });
        });
    });

    describe('::getAllPokemonIdsWithType', () => {
        describe('when the ids are in cache', () => {
            const cacheService = new InMemoryCacheService(loggerTest);
            let result: number[] | null;

            beforeEach(async () => {
                let adapter: CacheAdapter = new CacheAdapter(cacheService);

                await cacheService.set(
                    'type:pokemon:FIRE',
                    JSON.stringify(fakeRandemonTypeFireIds)
                );

                result = await adapter.getAllPokemonIdsWithType('FIRE');
            });

            afterAll(async () => {
                await cacheService.clear();
                await cacheService.disconnect();
            });

            it('should return the ids', () => {
                expect(result).toEqual([4, 5, 6, 37, 38, 58, 59, 77, 78, 126]);
            });
        });

        describe('when the ids are not in cache', () => {
            const cacheService = new InMemoryCacheService(loggerTest);
            let result: number[] | null;

            beforeEach(async () => {
                let adapter: CacheAdapter = new CacheAdapter(cacheService);

                result = await adapter.getAllPokemonIdsWithType('FIRE');
            });

            afterAll(async () => {
                await cacheService.clear();
                await cacheService.disconnect();
            });

            it('should return the ids', () => {
                expect(result).toBeNull();
            });
        });
    });

    describe('::setAllPokemonIdsWithType', () => {
        describe('when the ids have been set in cache', () => {
            const cacheService = new InMemoryCacheService(loggerTest);

            beforeEach(async () => {
                let adapter: CacheAdapter = new CacheAdapter(cacheService);

                await adapter.setAllPokemonIdsWithType('FIRE', fakeRandemonTypeFireIds);
            });

            afterAll(async () => {
                await cacheService.clear();
                await cacheService.disconnect();
            });

            it('should return the ids', async () => {
                expect(cacheService.get('type:pokemon:FIRE')).resolves.toEqual(
                    JSON.stringify([4, 5, 6, 37, 38, 58, 59, 77, 78, 126])
                );
            });
        });
    });

    describe('::getMoveByName', () => {
        describe('when the Move is in cache', () => {
            const cacheService = new InMemoryCacheService(loggerTest);
            let result: Move | null;

            beforeEach(async () => {
                let adapter: CacheAdapter = new CacheAdapter(cacheService);

                await cacheService.set(
                    'move:name:hyper-beam',
                    JSON.stringify(fakeRandemonMoveHyperBeam)
                );

                result = await adapter.getMoveByName('hyper-beam');
            });

            afterAll(async () => {
                await cacheService.clear();
                await cacheService.disconnect();
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
            const cacheService = new InMemoryCacheService(loggerTest);
            let result: Move | null;

            beforeEach(async () => {
                let adapter: CacheAdapter = new CacheAdapter(cacheService);

                result = await adapter.getMoveByName('hyper-beam');
            });

            afterAll(async () => {
                await cacheService.disconnect();
            });

            it('should return null', () => {
                expect(result).toBeNull();
            });
        });
    });

    describe('::setMoveByName', () => {
        describe('when the move has been set in cache', () => {
            const cacheService = new InMemoryCacheService(loggerTest);

            beforeEach(async () => {
                let adapter: CacheAdapter = new CacheAdapter(cacheService);

                await adapter.setMoveByName('hyper-beam', fakeRandemonMoveHyperBeam);
            });

            afterAll(async () => {
                await cacheService.clear();
                await cacheService.disconnect();
            });

            it('should return the move', async () => {
                expect(cacheService.get('move:name:hyper-beam')).resolves.toEqual(
                    JSON.stringify({
                        accuracy: 90,
                        power: 150,
                        pp: 5,
                        type: 'NORMAL',
                        name: 'hyper-beam'
                    })
                );
            });
        });
    });
});
