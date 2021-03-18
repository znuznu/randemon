import { GraphQLClient, request } from 'graphql-request';
import { Generation } from '../../models/generation';
import Pokemon from '../../models/pokemon';

import { qGetRandomTeam } from './schema';

const API_URL = `http://localhost:4000/queries`;

// Stay here for now
// const client = new GraphQLClient(API_URL, { headers: {} });

interface getRandomTeamResponse {
  getRandomTeam: {
    pokemon: Pokemon[];
  };
}

const getRandomTeam = (
  numbersOfPokemon: number = 6,
  generations: Generation[] = ['I']
) => {
  request(API_URL, qGetRandomTeam, { generations, numbersOfPokemon }).then(
    (reponse: getRandomTeamResponse) => {
      console.log(reponse.getRandomTeam.pokemon);
    }
  );
};

export { getRandomTeam };
