import { Team } from '../randemon/models/team';
import { generateTeam } from './service';

const teamResolver = {
    getRandomTeam: async (args: any): Promise<Team> => {
        return generateTeam({ ...args.parameters });
    }
};

export default teamResolver;
