import { CacheService } from '../../core/cache/cache.interface';
import { Move } from '../../models/randemon/move';
import Pokemon from '../../models/randemon/pokemon';
import Type from '../../models/randemon/type';
import { Connector } from './connector.interface';

export interface Config {
    BASE_URL: string;
}

export default class CacheConnector implements Connector {
    constructor(private cacheService: CacheService) {}

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
