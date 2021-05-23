import { URL } from 'url';

import { HttpConnector as PokeApiConnector, Config } from './httpConnector';
import { fakePokeAPIMoveHyperBeam } from '../../../tests/fixtures/fakePokeAPIMove';
import { fakePAPIPokemonWithOneType } from '../../../tests/fixtures/fakePokeAPIPokemon';
import { HttpService } from '../../core/http/http';
import { createHttpService } from '../../core/http/mock';
import Pokemon from '../../models/randemon/pokemon';
import { Move } from '../../models/randemon/move';
import { fakePokeAPITypeFire } from '../../../tests/fixtures/fakePokeAPIType';

describe('HTTP connector to PokéAPI - unit', () => {
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
                        json: fakePAPIPokemonWithOneType
                    }
                });

                jest.spyOn(httpService, 'get');

                const connector = new PokeApiConnector(config, httpService);

                await connector.getPokemon('charizard');
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
            let connector: PokeApiConnector;

            beforeEach(() => {
                httpService = createHttpService({
                    get: {
                        status: 404
                    }
                });

                connector = new PokeApiConnector(config, httpService);
            });

            it('should throw', async () => {
                await expect(() => connector.getPokemon('AshKetchum')).rejects.toThrow(
                    `Not data found for the Pokemon with name or id AshKetchum`
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
                        json: fakePAPIPokemonWithOneType
                    }
                });

                const connector = new PokeApiConnector(config, httpService);

                result = await connector.getPokemon('charizard');
            });

            it('should return the pokemon mapped', () => {
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

                const connector = new PokeApiConnector(config, httpService);

                await connector.getAllPokemonIdsWithType('FIRE');
            });

            it('should call', () => {
                expect(httpService.get).toHaveBeenCalledWith(
                    new URL('https://url.com/type/fire')
                );
            });
        });

        describe("when the type couldn't be found", () => {
            let httpService: HttpService;
            let connector: PokeApiConnector;

            beforeEach(() => {
                httpService = createHttpService({
                    get: {
                        status: 404
                    }
                });

                connector = new PokeApiConnector(config, httpService);
            });

            it('should throw', async () => {
                await expect(() =>
                    connector.getAllPokemonIdsWithType('FIRE')
                ).rejects.toThrow('Not data found for the Pokemon type fire');
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

                const connector = new PokeApiConnector(config, httpService);

                result = await connector.getAllPokemonIdsWithType('FIRE');
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

                const connector = new PokeApiConnector(config, httpService);

                await connector.getMove('hyper-beam');
            });

            it('should call', () => {
                expect(httpService.get).toHaveBeenCalledWith(
                    new URL('https://url.com/move/hyper-beam')
                );
            });
        });

        describe("when the move couldn't be found", () => {
            let httpService: HttpService;
            let connector: PokeApiConnector;

            beforeEach(() => {
                httpService = createHttpService({
                    get: {
                        status: 404
                    }
                });

                connector = new PokeApiConnector(config, httpService);
            });

            it('should throw', async () => {
                await expect(() => connector.getMove('unknown')).rejects.toThrow(
                    'Not data found for the move with name or id unknown'
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

                const connector = new PokeApiConnector(config, httpService);

                result = await connector.getMove('hyper-beam');
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
});
