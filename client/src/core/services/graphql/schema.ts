import { gql } from 'graphql-request';

const qCreateTeamRandomly = gql`
  query createTeamRandomly(
    $generations: [Generation]
    $numbersOfPokemon: Int
    $type: Type
  ) {
    createTeamRandomly(
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

export { qCreateTeamRandomly, qUpdateTeamRandomly };
