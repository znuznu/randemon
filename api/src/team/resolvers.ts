import { Team } from '../randemon/models/team';
import { generateTeam, updateTeam } from './service';

const teamResolver = {
    createTeamRandomly: async (args: any): Promise<Team> => {
        return generateTeam({ ...args.parameters });
    },
    updateTeamRandomly: async (args: any): Promise<Team> => {
        return updateTeam(args.parameters, args.team);
    }
};

export default teamResolver;
