import { Move } from '../../models/move';
import Pokemon from '../../models/pokemon';
import Type from '../../models/type';
import PokeApiRepository from '../../ports/pokeApiRepository';
import PokemonRepository from '../../ports/pokemonRepository';

class DataService {
    constructor(
        private pokeApiRepository: PokeApiRepository,
        private pokemonRepository: PokemonRepository
    ) { }

    async getIdsOfPokemonWithType(type: Type): Promise<number[]> {
        const typeIdsInCache = await this.pokemonRepository.getAllPokemonIdsWithType(type);
        if (!typeIdsInCache) {
            const typeIds = await this.pokeApiRepository.getAllPokemonIdsWithType(type);
            await this.pokemonRepository.setAllPokemonIdsWithType(type, typeIds);

            return typeIds;
        }

        return typeIdsInCache;
    }

    async getPokemonById(id: string): Promise<Pokemon> {
        const pokemonFromCache = await this.pokemonRepository.getPokemonById(id);

        if (pokemonFromCache) {
            return pokemonFromCache;
        }

        const pokemonWithoutSpecies = await this.pokeApiRepository.getPokemon(id);

        const pokemon = await this.pokeApiRepository.getSpeciesData(pokemonWithoutSpecies);

        await this.pokemonRepository.setPokemonById(id, pokemon);
        await this.pokemonRepository.setPokemonByName(pokemon.names.english, pokemon);

        return pokemon;
    }

    async getMoveByName(name: string): Promise<Move> {
        const move = await this.pokemonRepository.getMoveByName(name);
        if (!move) {
            const move = await this.pokeApiRepository.getMove(name);
            await this.pokemonRepository.setMoveByName(name, move);

            return move;
        }

        return move;
    }

    async getIdsOfPokemonWithTypes(types: Type[]): Promise<number[]> {
        let typesIds: number[] = [];

        for (const type of types) {
            const typeIds = await this.getIdsOfPokemonWithType(type);
            typesIds = [...typesIds, ...typeIds];
        }

        return Promise.resolve(typesIds);
    }
}

export default DataService;
