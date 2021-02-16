import { Team } from '../models/randemon/team';
import { generateTeam, generateTeamWithType } from './service';

const teamResolver = {
    getRandomTeam: async (args: any): Promise<Team> => {
        if (args.parameters.type) {
            return generateTeamWithType({ ...args.parameters });
        }

        return generateTeam({ ...args.parameters });
    }
};

export default teamResolver;
