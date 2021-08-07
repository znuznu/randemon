import { CacheService } from '../../domain/ports/cache.service';
import { Move } from '../../domain/models/move';
import Pokemon from '../../domain/models/pokemon';
import Type from '../../domain/models/type';
import PokemonRepository from '../../domain/ports/pokemonRepository';

export interface Config {
    BASE_URL: string;
}

export default class CachePokemonRepository implements PokemonRepository {
    constructor(private cacheService: CacheService) { }

    async getPokemonByName(nameOrId: string): Promise<Pokemon | null> {
        return this.cacheService
            .get(`pokemon:name:${nameOrId}`)
            .then((value: string | null) => {
                return value ? JSON.parse(value) : null;
            });
    }

    async setPokemonByName(name: string, pokemon: Pokemon): Promise<void> {
        this.cacheService.set(`pokemon:name:${name}`, JSON.stringify(pokemon));
    }

    async getPokemonById(id: string): Promise<Pokemon | null> {
        return this.cacheService.get(`pokemon:id:${id}`).then((value: string | null) => {
            return value ? JSON.parse(value) : null;
        });
    }

    async setPokemonById(id: string, pokemon: Pokemon): Promise<void> {
        await this.cacheService.set(`pokemon:id:${pokemon.id}`, JSON.stringify(pokemon));
    }

    async getAllPokemonIdsWithType(type: Type): Promise<number[] | null> {
        return this.cacheService
            .get(`type:pokemon:${type}`)
            .then((value: string | null) => {
                return value ? JSON.parse(value) : null;
            });
    }

    async setAllPokemonIdsWithType(type: Type, ids: number[]): Promise<void> {
        await this.cacheService.set(`type:pokemon:${type}`, JSON.stringify(ids));
    }

    async getMoveByName(name: string): Promise<Move | null> {
        return this.cacheService.get(`move:name:${name}`).then((value: string | null) => {
            return value ? JSON.parse(value) : null;
        });
    }

    async setMoveByName(name: string, move: Move): Promise<void> {
        await this.cacheService.set(`move:name:${name}`, JSON.stringify(move));
    }
}
