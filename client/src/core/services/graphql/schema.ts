import { gql } from 'graphql-request';

const qGetRandomTeam = gql`
  query getRandomTeam($generations: [Generation], $numbersOfPokemon: Int) {
    getRandomTeam(
      parameters: { generations: $generations, numbersOfPokemon: $numbersOfPokemon }
    ) {
      pokemon {
        id
        name
        frontSprite
        officialArtwork
        moves {
          name
          type
          accuracy
          power
          pp
        }
      }
    }
  }
`;

export { qGetRandomTeam };
