import { config } from '../../config';
import { createTeamResolvers } from '../../team/resolvers';
import { buildAdapters, Adapters } from '../adapter/buildAdapters';
import { CoreServices } from '../services/buildCoreServices';

export function buildRootResolver(services: CoreServices) {
    const adapters: Adapters = buildAdapters(config, services);
    const teamResolvers = createTeamResolvers(
        adapters.pokeApiAdapter,
        adapters.cacheAdapter
    );

    return { ...teamResolvers };
}
