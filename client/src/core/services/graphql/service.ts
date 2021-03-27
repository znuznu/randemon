import { GraphQLClient, request } from 'graphql-request';
import { Generation } from '../../models/generation';
import Pokemon from '../../models/pokemon';
import { Team } from '../../models/team';
import { Type } from '../../models/type';

import { qGetRandomTeam, qUpdateTeamRandomly } from './schema';

const API_URL = `http://localhost:4000/queries`;

// Stay here for now
// const client = new GraphQLClient(API_URL, { headers: {} });

interface GetRandomTeamResponse {
  getRandomTeam: {
    pokemon: Pokemon[];
  };
}

const getRandomTeam = async (
  numbersOfPokemon: number = 6,
  generations: Generation[] = ['I'],
  type: Type | null = null
): Promise<Team | null> => {
  try {
    const response: GetRandomTeamResponse = await request(API_URL, qGetRandomTeam, {
      generations,
      numbersOfPokemon,
      type
    });

    return response.getRandomTeam;
  } catch (error) {
    // fixme: handle error
    return null;
  }
};

interface UpdateRandomTeamResponse {
  updateTeamRandomly: {
    pokemon: Pokemon[];
  };
}

const updateTeamRandomly = async (
  numbersOfPokemon: number = 6,
  generations: Generation[] = ['I'],
  type: Type | null = null,
  team: Team
): Promise<Team | null> => {
  try {
    const response: UpdateRandomTeamResponse = await request(
      API_URL,
      qUpdateTeamRandomly,
      {
        generations,
        numbersOfPokemon,
        type,
        team
      }
    );

    return response.updateTeamRandomly;
  } catch (error) {
    // fixme: handle error
    return null;
  }
};

export { getRandomTeam, updateTeamRandomly };
