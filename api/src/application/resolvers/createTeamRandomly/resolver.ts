import { Resolver } from '../../graphql/resolver/resolver.interface';
import Pokemon from '../../../domain/models/pokemon';
import { Team, TeamConfig } from '../../../domain/models/team';
import { filterValues } from '../../../utils';
import DataService from '../../../domain/team/services/data.service';
import { GenerationService } from '../../../domain/team/services/generation.service';
import TeamService from '../../../domain/team/services/team.service';

class CreateTeamRandomlyResolver implements Resolver {
    constructor(private dataService: DataService) { }

    async createTeamRandomly(config: TeamConfig): Promise<Team> {
        const { generations, numberOfPokemon, types } = config;
        const generationsIds = GenerationService.getIndexesOfMultipleGenerations(
            generations
        );
        let indexes: number[] = generationsIds;

        if (types && types.length) {
            const typeIds = await this.dataService.getIdsOfPokemonWithTypes(types);
            indexes = filterValues(generationsIds, typeIds);
        }

        const teamIds = TeamService.getRandomTeamIds(indexes, numberOfPokemon);

        return {
            pokemon: await Promise.all(
                teamIds.map(async (pokemonId) => {
                    return this.getPokemonWithRandomMoves(pokemonId.toString());
                })
            )
        };
    }

    async getPokemonWithRandomMoves(pokemonId: string): Promise<Pokemon> {
        const pokemon = await this.dataService.getPokemonById(pokemonId);
        const randomMoveNames = TeamService.getRandomMoveNames(pokemon.allMoveNames, 4);

        return {
            ...pokemon,
            moves: await Promise.all(
                randomMoveNames.map(async (moveName) => {
                    return this.dataService.getMoveByName(moveName);
                })
            )
        };
    }
}

export default CreateTeamRandomlyResolver;
