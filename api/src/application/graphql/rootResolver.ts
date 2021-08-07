import { config } from '../../infrastructure/server/config';
import { createTeamResolvers } from '../resolvers/createTeamResolvers';
import { buildAdapters, Adapters } from '../../infrastructure/buildAdapters';
import { InfrastructureServices } from '../../infrastructure/services/buildInfrastructureServices';

export function buildRootResolver(services: InfrastructureServices) {
    const adapters: Adapters = buildAdapters(config, services);
    const teamResolvers = createTeamResolvers(
        adapters.pokeApi,
        adapters.cache
    );

    return { ...teamResolvers };
}
