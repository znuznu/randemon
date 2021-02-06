import Type from './type';

export default interface Pokemon {
    id: number;
    name: string;
    frontSprite: string;
    types: [Type, Type?];
}
