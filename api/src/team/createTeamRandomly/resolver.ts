import { Resolver } from '../../core/graphql/resolver/resolver.interface';
import Pokemon from '../../models/randemon/pokemon';
import { Team, TeamConfig } from '../../models/randemon/team';
import Type from '../../models/randemon/type';
import { filterValues } from '../../utils';
import DataService from '../service/data.service';
import { GenerationService } from '../service/generation.service';
import TeamService from '../service/team.service';

class CreateTeamRandomlyResolver implements Resolver {
    constructor(private dataService: DataService) {}

    async createTeamRandomly(config: TeamConfig): Promise<Team> {
        const { generations, numberOfPokemon, types } = config;
        let generationsIds = GenerationService.getIndexesOfMultipleGenerations(
            generations
        );
        let indexes: number[] = generationsIds;

        if (types && types.length) {
            let typeIds = await this.dataService.getIdsOfPokemonWithTypes(types);
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
