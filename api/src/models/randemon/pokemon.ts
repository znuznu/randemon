import { Move } from './move';
import Type from './type';

interface Names {
    english: string;
    japanese?: string;
}

export default interface Pokemon {
    id: number;
    names: Names;
    frontSprite: string | null;
    officialArtwork: string | null;
    types: [Type, Type | null];
    moves: Move[];
    allMoveNames: string[];
    isLocked: boolean;
}
