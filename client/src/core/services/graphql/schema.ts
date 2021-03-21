import { gql } from 'graphql-request';

const qGetRandomTeam = gql`
  query getRandomTeam($generations: [Generation], $numbersOfPokemon: Int, $type: Type) {
    getRandomTeam(
      parameters: {
        generations: $generations
        numbersOfPokemon: $numbersOfPokemon
        type: $type
      }
    ) {
      pokemon {
        id
        name
        frontSprite
        officialArtwork
        types
        moves {
          name
          type
          accuracy
          power
          pp
        }
        isLocked
      }
    }
  }
`;

export { qGetRandomTeam };
