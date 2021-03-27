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

const qUpdateTeamRandomly = gql`
  query updateTeamRandomly(
    $generations: [Generation]
    $numbersOfPokemon: Int
    $type: Type
    $team: TeamInput
  ) {
    updateTeamRandomly(
      parameters: {
        generations: $generations
        numbersOfPokemon: $numbersOfPokemon
        type: $type
      }
      team: $team
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

export { qGetRandomTeam, qUpdateTeamRandomly };
