import { gql } from 'graphql-request';

const qCreateTeamRandomly = gql`
  query createTeamRandomly(
    $generations: [Generation]
    $numbersOfPokemon: Int
    $types: [Type]
  ) {
    createTeamRandomly(
      parameters: {
        generations: $generations
        numbersOfPokemon: $numbersOfPokemon
        types: $types
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
    $types: [Type]
    $team: TeamInput
  ) {
    updateTeamRandomly(
      parameters: {
        generations: $generations
        numbersOfPokemon: $numbersOfPokemon
        types: $types
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
