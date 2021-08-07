import { Move } from '../models/move';
import Pokemon from '../models/pokemon';
import Type from '../models/type';

export default interface PokemonRepository {
    getPokemonByName(name: string): Promise<Pokemon | null>;
    setPokemonByName(name: string, pokemon: Pokemon): Promise<void>;
    getPokemonById(id: string): Promise<Pokemon | null>;
    setPokemonById(id: string, pokemon: Pokemon): Promise<void>;
    getAllPokemonIdsWithType(type: Type): Promise<number[] | null>;
    setAllPokemonIdsWithType(type: Type, ids: number[]): Promise<void>;
    getMoveByName(name: string): Promise<Move | null>;
    setMoveByName(name: string, move: Move): Promise<void>;
}
