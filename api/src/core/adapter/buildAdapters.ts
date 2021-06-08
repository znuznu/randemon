import CacheAdapter from '../../adapter/cache/cacheAdapter';
import { HttpAdapter as PokeApiAdapter } from '../../adapter/pokeApi/httpAdapter';
import { Config } from '../../config';
import { CoreServices } from '../services/buildCoreServices';

export function buildAdapters(config: Config, services: CoreServices): Adapters {
    const pokeApiAdapter = new PokeApiAdapter(
        { BASE_URL: config.API_URL },
        services.httpService
    );

    const cacheAdapter = new CacheAdapter(services.cacheService);

    return { pokeApiAdapter, cacheAdapter };
}

export interface Adapters {
    pokeApiAdapter: PokeApiAdapter;
    cacheAdapter: CacheAdapter;
}
