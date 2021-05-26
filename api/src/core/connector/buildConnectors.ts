import CacheConnector from '../../connector/cache/cacheConnector';
import { HttpConnector as PokeApiConnector } from '../../connector/pokeApi/httpConnector';
import { Config } from '../../config';
import { CoreServices } from '../services/buildCoreServices';

export function buildConnectors(config: Config, services: CoreServices): Connectors {
    const pokeApiConnector = new PokeApiConnector(
        { BASE_URL: config.API_URL },
        services.httpService
    );

    const cacheConnector = new CacheConnector(services.cacheService);

    return { pokeApiConnector, cacheConnector };
}

export interface Connectors {
    pokeApiConnector: PokeApiConnector;
    cacheConnector: CacheConnector;
}
