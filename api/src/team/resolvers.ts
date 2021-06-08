import CacheAdapter from '../adapter/cache/cacheAdapter';
import { HttpAdapter as PokeApiAdapter } from '../adapter/pokeApi/httpAdapter';
import { Team } from '../models/randemon/team';
import { buildCreateTeamRandomlyResolver } from './createTeamRandomly/builder';
import DataService from './service/data.service';
import { buildUpdateTeamRandomlyResolver } from './updateTeamRandomly/builder';

export function createTeamResolvers(
    pokeApiAdapter: PokeApiAdapter,
    cacheAdapter: CacheAdapter
): Record<string, unknown> {
    const dataService: DataService = new DataService(pokeApiAdapter, cacheAdapter);

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
