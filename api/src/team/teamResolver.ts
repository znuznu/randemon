import axios from 'axios';
import { API_URL } from '../constants';
import { Team, TeamParameters } from '../models/team';
import teamService from './teamService';

const instance = axios.create({
    baseURL: `${API_URL}`
});

const teamResolver = {
    getTeam: async (parameters: TeamParameters): Promise<Team> => {
        const { generations, numbersOfPokemons } = parameters;

        axios
            .get(`${API_URL}/`)
            .then(() => {})
            .catch();

        return teamService.generateTeam(parameters);
    }
};

export default teamResolver;
