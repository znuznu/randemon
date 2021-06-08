import CacheAdapter from '../../adapter/cache/cacheAdapter';
import { HttpAdapter as PokeApiAdapter } from '../../adapter/pokeApi/httpAdapter';
import { Move } from '../../models/randemon/move';
import Pokemon from '../../models/randemon/pokemon';
import Type from '../../models/randemon/type';

class DataService {
    constructor(
        private pokeApiAdapter: PokeApiAdapter,
        private redisConnector: CacheAdapter
    ) {}

    async getIdsOfPokemonWithType(type: Type): Promise<number[]> {
        const typeIdsInCache = await this.redisConnector.getAllPokemonIdsWithType(type);
        if (!typeIdsInCache) {
            const typeIds = await this.pokeApiAdapter.getAllPokemonIdsWithType(type);
            await this.redisConnector.setAllPokemonIdsWithType(type, typeIds);

            return typeIds;
        }

        return typeIdsInCache;
    }

    async getPokemonById(id: string): Promise<Pokemon> {
        const pokemon = await this.redisConnector.getPokemonById(id);
        if (!pokemon) {
            const pokemon = await this.pokeApiAdapter.getPokemon(id);
            await this.redisConnector.setPokemonById(id, pokemon);
            await this.redisConnector.setPokemonByName(pokemon.name, pokemon);

            return pokemon;
        }

        return pokemon;
    }

    async getMoveByName(name: string): Promise<Move> {
        const move = await this.redisConnector.getMoveByName(name);
        if (!move) {
            const move = await this.pokeApiAdapter.getMove(name);
            await this.redisConnector.setMoveByName(name, move);

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
