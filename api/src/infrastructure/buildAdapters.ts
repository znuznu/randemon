import PokeApiRepository from '../domain/ports/pokeApiRepository';
import PokemonRepository from '../domain/ports/pokemonRepository';
import CachePokemonRepository from './cache/cachePokemonRepository';
import HttpPokeApiRepository from './pokeApi/httpPokeApiRepository';
import { Config } from './server/config';
import { InfrastructureServices } from './services/buildInfrastructureServices';

export function buildAdapters(config: Config, services: InfrastructureServices): Adapters {
    const httpPokeApiRepository = new HttpPokeApiRepository(
        { BASE_URL: config.API_URL },
        services.httpService
    );

    const cachePokemonRepository = new CachePokemonRepository(services.cacheService);

    return { pokeApi: httpPokeApiRepository, cache: cachePokemonRepository };
}

export interface Adapters {
    pokeApi: PokeApiRepository;
    cache: PokemonRepository;
}
