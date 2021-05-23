import { Move } from '../../models/randemon/move';
import Pokemon from '../../models/randemon/pokemon';
import Type from '../../models/randemon/type';

export interface Connector {
    getPokemon(nameOrId: string): Promise<Pokemon>;
    getAllPokemonIdsWithType(type: Type): Promise<number[]>;
    getMove(nameOrId: string): Promise<Move>;
}
