import { Move } from '../../models/randemon/move';
import Pokemon from '../../models/randemon/pokemon';
import Type from '../../models/randemon/type';

export interface Connector {
    getPokemonByName(name: string): Promise<Pokemon | null>;
    setPokemonByName(name: string, pokemon: Pokemon): Promise<void>;
    getPokemonById(id: string): Promise<Pokemon | null>;
    setPokemonById(id: string, pokemon: Pokemon): Promise<void>;
    getAllPokemonIdsWithType(type: Type): Promise<number[] | null>;
    setAllPokemonIdsWithType(type: Type, ids: number[]): Promise<void>;
    getMoveByName(name: string): Promise<Move | null>;
    setMoveByName(name: string, move: Move): Promise<void>;
}
