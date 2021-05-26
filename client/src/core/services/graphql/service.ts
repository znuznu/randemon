import { request } from 'graphql-request';

import { qCreateTeamRandomly, qUpdateTeamRandomly } from './schema';

import { Generation } from '../../models/generation';
import { Team } from '../../models/team';
import { Type } from '../../models/type';
import Pokemon from '../../models/pokemon';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://randemon-api.herokuapp.com/queries'
    : 'http://localhost:4000/queries';

interface createTeamRandomlyResponse {
  createTeamRandomly: {
    pokemon: Pokemon[];
  };
}

const createTeamRandomly = async (
  numberOfPokemon: number = 6,
  generations: Generation[] = ['I'],
  types: Type[] | null = []
): Promise<Team | null> => {
  try {
    const response: createTeamRandomlyResponse = await request(
      API_URL,
      qCreateTeamRandomly,
      {
        generations,
        numberOfPokemon,
        types
      }
    );

    return response.createTeamRandomly;
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
  numberOfPokemon: number = 6,
  generations: Generation[] = ['I'],
  types: Type[] | null = [],
  team: Team
): Promise<Team | null> => {
  try {
    const response: UpdateRandomTeamResponse = await request(
      API_URL,
      qUpdateTeamRandomly,
      {
        generations,
        numberOfPokemon,
        types,
        team
      }
    );

    return response.updateTeamRandomly;
  } catch (error) {
    // fixme: handle error
    return null;
  }
};

export { createTeamRandomly, updateTeamRandomly };
