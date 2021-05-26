import CacheConnector from '../connector/cache/cacheConnector';
import { HttpConnector as PokeApiConnector } from '../connector/pokeApi/httpConnector';
import { Team } from '../models/randemon/team';
import { buildCreateTeamRandomlyResolver } from './createTeamRandomly/builder';
import DataService from './service/data.service';
import { buildUpdateTeamRandomlyResolver } from './updateTeamRandomly/builder';

export function createTeamResolvers(
    pokeApiConnector: PokeApiConnector,
    cacheConnector: CacheConnector
): Record<string, unknown> {
    const dataService: DataService = new DataService(pokeApiConnector, cacheConnector);

    return {
        createTeamRandomly: async (args: any): Promise<Team> => {
            return buildCreateTeamRandomlyResolver(dataService).createTeamRandomly({
                ...args.parameters
            });
        },
        updateTeamRandomly: async (args: any): Promise<Team> => {
            return buildUpdateTeamRandomlyResolver(dataService).updateTeamRandomly(
                args.parameters,
                args.team
            );
        }
    };
}
