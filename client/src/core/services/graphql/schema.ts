import { gql } from 'graphql-request';

const qCreateTeamRandomly = gql`
  query createTeamRandomly(
    $generations: [Generation]
    $numberOfPokemon: Int
    $types: [Type]
  ) {
    createTeamRandomly(
      parameters: {
        generations: $generations
        numberOfPokemon: $numberOfPokemon
        types: $types
      }
    ) {
      pokemon {
        id
        names {
          english
          japanese
        }
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
    $numberOfPokemon: Int
    $types: [Type]
    $team: TeamInput
  ) {
    updateTeamRandomly(
      parameters: {
        generations: $generations
        numberOfPokemon: $numberOfPokemon
        types: $types
      }
      team: $team
    ) {
      pokemon {
        id
        names {
          english
          japanese
        }
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
