import { GraphQLClient, request } from 'graphql-request';
import { Generation } from '../../models/generation';
import Pokemon from '../../models/pokemon';
import { Team } from '../../models/team';
import { Type } from '../../models/type';

import { qGetRandomTeam } from './schema';

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
    return null;
  }
};

export { getRandomTeam };
