import { getRandomNumberInRange } from '../../utils';

export class TeamService {
    static getRandomTeamIds(pokemonIds: number[], amount: number): number[] {
        const teamIds: number[] = [];

        while (amount) {
            if (!pokemonIds.length) {
                break;
            }

            const index = pokemonIds.splice(
                getRandomNumberInRange(0, pokemonIds.length),
                1
            )[0];
            teamIds.push(index);
            amount--;
        }

        return teamIds;
    }

    static getRandomMoveNames(moveNames: string[], numberOfMoves: number): string[] {
        // Gen 8 doesn't have any moves yet - 03/27/2021
        if (!moveNames.length) {
            return [];
        }

        if (!numberOfMoves) {
            return [];
        }

        if (numberOfMoves > moveNames.length) {
            return moveNames;
        }

        const randomMoveNames: string[] = [];
        let movesLeft = numberOfMoves;

        while (moveNames.length && movesLeft) {
            const moveName = moveNames.splice(
                getRandomNumberInRange(0, moveNames.length),
                1
            )[0];

            randomMoveNames.push(moveName);
            movesLeft--;
        }

        return randomMoveNames;
    }
}

export default TeamService;
