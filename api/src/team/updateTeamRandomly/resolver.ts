import { Resolver } from '../../core/graphql/resolver/resolver.interface';
import { logger } from '../../logger';
import Pokemon from '../../models/randemon/pokemon';
import { Team, TeamConfig } from '../../models/randemon/team';
import { filterValues, getRandomNumberInRange } from '../../utils';
import DataService from '../service/data.service';
import { GenerationService } from '../service/generation.service';
import TeamService from '../service/team.service';

class UpdateTeamRandomlyResolver implements Resolver {
    constructor(private dataService: DataService) {}

    // TODO split in testable methods
    async updateTeamRandomly(config: TeamConfig, team: Team): Promise<Team> {
        const { generations, numberOfPokemon, types } = config;
        const { pokemon } = team;

        const lockedPokemon = pokemon.filter((pokemon) => pokemon.isLocked);
        let pokemonLeft = numberOfPokemon - lockedPokemon.length;

        if (pokemonLeft < 0) {
            logger.info(
                `Number of locked Pokemon (${lockedPokemon.length}) is superior to numberOfPokemon (${numberOfPokemon})`
            );
            return { pokemon: lockedPokemon };
        }

        const generationsIds = GenerationService.getIndexesOfMultipleGenerations(
            generations
        );

        const lockedPokemonIds = lockedPokemon.map((pokemon) => pokemon.id);
        let poolIds = generationsIds.filter((id) => !lockedPokemonIds.includes(id));

        if (types && types.length) {
            let typeIds = await this.dataService.getIdsOfPokemonWithTypes(types);
            poolIds = filterValues(poolIds, typeIds);
        }

        if (!poolIds.length) {
            return { pokemon: lockedPokemon };
        }

        const newTeam: Team = { pokemon: [] };

        for (const teamPokemon of pokemon) {
            if (!poolIds.length) {
                break;
            }

            if (!teamPokemon.isLocked && poolIds.length) {
                if (!pokemonLeft) {
                    continue;
                }

                const newPokemonId = poolIds.splice(
                    getRandomNumberInRange(0, poolIds.length),
                    1
                )[0];
                const newPokemon = await this.getPokemonWithRandomMoves(
                    newPokemonId.toString()
                );
                newTeam.pokemon.push(newPokemon);
                pokemonLeft--;
            } else {
                newTeam.pokemon.push(teamPokemon);
            }
        }

        while (poolIds.length && pokemonLeft) {
            const newPokemonId = poolIds.splice(
                getRandomNumberInRange(0, poolIds.length),
                1
            )[0];
            const newPokemon = await this.getPokemonWithRandomMoves(
                newPokemonId.toString()
            );
            newTeam.pokemon.push(newPokemon);
            pokemonLeft--;
        }

        return newTeam;
    }

    // Same as the create resolver, but we may want to lock some moves later
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

export default UpdateTeamRandomlyResolver;
