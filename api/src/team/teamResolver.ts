import { Team, TeamConfig } from '../models/randemon/team';
import teamService from './teamService';

const teamResolver = {
    getRandomTeam: async (args: any): Promise<Team> => {
        if (args.parameters.type) {
            return teamService.generateTeamWithType({ ...args.parameters });
        }

        return teamService.generateTeam({ ...args.parameters });
    }
};

export default teamResolver;
