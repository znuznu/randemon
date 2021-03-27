import { Team } from '../randemon/models/team';
import { generateTeam, updateTeamRandomly } from './service';

const teamResolver = {
    getRandomTeam: async (args: any): Promise<Team> => {
        return generateTeam({ ...args.parameters });
    },
    updateTeamRandomly: async (args: any): Promise<Team> => {
        return updateTeamRandomly(args.parameters, args.team);
    }
};

export default teamResolver;
