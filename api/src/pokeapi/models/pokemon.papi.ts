import SpritePAPI from './sprite.papi';
import TypePAPI from './type.papi';

export default interface PokemonPAPI {
    id: number;
    name: string;
    sprites: SpritePAPI;
    types: [TypePAPI, TypePAPI?];
}