import { Team } from '../../domain/models/team';
import { buildCreateTeamRandomlyResolver } from './createTeamRandomly/builder';
import DataService from '../../domain/team/services/data.service';
import { buildUpdateTeamRandomlyResolver } from './updateTeamRandomly/builder';
import PokeApiRepository from '../../domain/ports/pokeApiRepository';
import PokemonRepository from '../../domain/ports/pokemonRepository';

export function createTeamResolvers(
    pokeApiRepository: PokeApiRepository,
    pokemonRepository: PokemonRepository
): Record<string, unknown> {
    const dataService: DataService = new DataService(pokeApiRepository, pokemonRepository);

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
