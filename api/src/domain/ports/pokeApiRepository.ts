import { Move } from '../models/move';
import Pokemon from '../models/pokemon';
import Type from '../models/type';

export default interface PokeApiRepository {
    getPokemon(nameOrId: string): Promise<Pokemon>;
    getAllPokemonIdsWithType(type: Type): Promise<number[]>;
    getMove(nameOrId: string): Promise<Move>;
    getSpeciesData(pokemon: Pokemon): Promise<Pokemon>;
}
