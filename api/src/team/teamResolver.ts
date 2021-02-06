import { Team, TeamParameters } from '../models/randemon/team';
import teamService from './teamService';

const teamResolver = {
    getRandomTeam: async (args: any): Promise<Team> => {
        return teamService.generateTeam(args.parameters);
    }
};

export default teamResolver;
