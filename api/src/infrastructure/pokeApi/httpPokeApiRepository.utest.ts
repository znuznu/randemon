import { URL } from 'url';

import HttpPokeApiRepository, { Config } from './httpPokeApiRepository';
import { fakePokeAPIMoveHyperBeam } from '../../../tests/fixtures/fakePokeAPIMove';
import { fakePokeAPIPokemonWithOneType } from '../../../tests/fixtures/fakePokeAPIPokemon';
import { createHttpService } from '../http/mock';
import Pokemon from '../../domain/models/pokemon';
import { Move } from '../../domain/models/move';
import { fakePokeAPITypeFire } from '../../../tests/fixtures/fakePokeAPIType';
import { fakePokeAPISpeciesCharizard } from '../../../tests/fixtures/fakePokeAPISpecies';
import { fakeRandemonPokemonWithOneType } from '../../../tests/fixtures/fakeRandemonPokemon';
import { HttpService } from '../../domain/ports/http/http.service';

describe('PokéAPI HTTP adapter - unit', () => {
    const config: Config = {
        BASE_URL: 'https://url.com'
    };

    describe('::getPokemon', () => {
        describe('call to PokéAPI', () => {
            let httpService: HttpService;

            beforeEach(async () => {
                httpService = createHttpService({
                    get: {
                        status: 200,
                        json: fakePokeAPIPokemonWithOneType
                    }
                });

                jest.spyOn(httpService, 'get');

                const adapter = new HttpPokeApiRepository(config, httpService);

                await adapter.getPokemon('charizard');
            });

            afterEach(() => {
                jest.restoreAllMocks();
            });

            it('should call', () => {
                expect(httpService.get).toHaveBeenCalledWith(
                    new URL('https://url.com/pokemon/charizard')
                );
            });
        });

        describe("when the pokemon couldn't be found", () => {
            let httpService: HttpService;
            let adapter: HttpPokeApiRepository;

            beforeEach(() => {
                httpService = createHttpService({
                    get: {
                        status: 404
                    }
                });

                adapter = new HttpPokeApiRepository(config, httpService);
            });

            it('should throw', async () => {
                await expect(() => adapter.getPokemon('AshKetchum')).rejects.toThrow(
                    `No data found for the Pokemon with name or id AshKetchum`
                );
            });
        });

        describe('when the pokemon has been found', () => {
            let httpService: HttpService;
            let result: Pokemon;

            beforeEach(async () => {
                httpService = createHttpService({
                    get: {
                        status: 200,
                        json: fakePokeAPIPokemonWithOneType
                    }
                });

                const adapter = new HttpPokeApiRepository(config, httpService);

                result = await adapter.getPokemon('charizard');
            });

            it('should return the pokemon mapped', () => {
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
    });

    describe('::getAllPokemonIdsWithType', () => {
        describe('call to PokéAPI', () => {
            let httpService: HttpService;

            beforeEach(async () => {
                httpService = createHttpService({
                    get: {
                        status: 200,
                        json: fakePokeAPITypeFire
                    }
                });

                jest.spyOn(httpService, 'get');

                const adapter = new HttpPokeApiRepository(config, httpService);

                await adapter.getAllPokemonIdsWithType('FIRE');
            });

            it('should call', () => {
                expect(httpService.get).toHaveBeenCalledWith(
                    new URL('https://url.com/type/fire')
                );
            });
        });

        describe("when the type couldn't be found", () => {
            let httpService: HttpService;
            let adapter: HttpPokeApiRepository;

            beforeEach(() => {
                httpService = createHttpService({
                    get: {
                        status: 404
                    }
                });

                adapter = new HttpPokeApiRepository(config, httpService);
            });

            it('should throw', async () => {
                await expect(() =>
                    adapter.getAllPokemonIdsWithType('FIRE')
                ).rejects.toThrow('No data found for the Pokemon type fire');
            });
        });

        describe('when the type has been found', () => {
            let httpService: HttpService;
            let result: number[];

            beforeEach(async () => {
                httpService = createHttpService({
                    get: {
                        status: 200,
                        json: fakePokeAPITypeFire
                    }
                });

                const adapter = new HttpPokeApiRepository(config, httpService);

                result = await adapter.getAllPokemonIdsWithType('FIRE');
            });

            it('should return the ids', () => {
                expect(result).toEqual([4, 5, 6, 37, 38, 58, 59, 77, 78, 126]);
            });
        });
    });

    describe('::getMove', () => {
        describe('call to PokéAPI', () => {
            let httpService: HttpService;

            beforeEach(async () => {
                httpService = createHttpService({
                    get: {
                        status: 200,
                        json: fakePokeAPIMoveHyperBeam
                    }
                });

                jest.spyOn(httpService, 'get');

                const adapter = new HttpPokeApiRepository(config, httpService);

                await adapter.getMove('hyper-beam');
            });

            it('should call', () => {
                expect(httpService.get).toHaveBeenCalledWith(
                    new URL('https://url.com/move/hyper-beam')
                );
            });
        });

        describe("when the move couldn't be found", () => {
            let httpService: HttpService;
            let adapter: HttpPokeApiRepository;

            beforeEach(() => {
                httpService = createHttpService({
                    get: {
                        status: 404
                    }
                });

                adapter = new HttpPokeApiRepository(config, httpService);
            });

            it('should throw', async () => {
                await expect(() => adapter.getMove('unknown')).rejects.toThrow(
                    'No data found for the move with name or id unknown'
                );
            });
        });

        describe('when the move has been found', () => {
            let httpService: HttpService;
            let result: Move;

            beforeEach(async () => {
                httpService = createHttpService({
                    get: {
                        status: 200,
                        json: fakePokeAPIMoveHyperBeam
                    }
                });

                const adapter = new HttpPokeApiRepository(config, httpService);

                result = await adapter.getMove('hyper-beam');
            });

            it('should return the move mapped', () => {
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

    describe('::getSpeciesData', () => {
        describe('call to PokéAPI', () => {
            let httpService: HttpService;

            beforeEach(async () => {
                httpService = createHttpService({
                    get: {
                        status: 200,
                        json: fakePokeAPISpeciesCharizard
                    }
                });

                jest.spyOn(httpService, 'get');

                const adapter = new HttpPokeApiRepository(config, httpService);

                await adapter.getSpeciesData(fakeRandemonPokemonWithOneType);
            });

            it('should call', () => {
                expect(httpService.get).toHaveBeenCalledWith(
                    new URL('https://url.com/pokemon-species/6')
                );
            });
        });

        describe("when the species data couldn't be found", () => {
            let httpService: HttpService;
            let adapter: HttpPokeApiRepository;

            beforeEach(() => {
                httpService = createHttpService({
                    get: {
                        status: 404
                    }
                });

                adapter = new HttpPokeApiRepository(config, httpService);
            });

            it('should throw', async () => {
                await expect(() =>
                    adapter.getSpeciesData(fakeRandemonPokemonWithOneType)
                ).rejects.toThrow('No data found for the species with id 6');
            });
        });

        describe('when the species data has been found', () => {
            let httpService: HttpService;
            let result: Pokemon;

            beforeEach(async () => {
                httpService = createHttpService({
                    get: {
                        status: 200,
                        json: fakePokeAPISpeciesCharizard
                    }
                });

                const adapter = new HttpPokeApiRepository(config, httpService);

                result = await adapter.getSpeciesData(fakeRandemonPokemonWithOneType);
            });

            it('should return the move mapped', () => {
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
});
