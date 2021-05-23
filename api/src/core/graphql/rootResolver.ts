import { config } from '../../config';
import { createTeamResolvers } from '../../team/resolvers';
import { buildConnectors, Connectors } from '../connector/buildConnectors';
import { CoreServices } from '../services/buildCoreServices';

export function buildRootResolver(services: CoreServices) {
    const connectors: Connectors = buildConnectors(config, services);
    const teamResolvers = createTeamResolvers(
        connectors.pokeApiConnector,
        connectors.cacheConnector
    );

    return { ...teamResolvers };
}
