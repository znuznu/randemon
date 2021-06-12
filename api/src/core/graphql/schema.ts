import { buildSchema } from 'graphql';

const schema = buildSchema(`
        """
        The Pokémon generations.
        """
        enum Generation {
            I,
            II,
            III,
            IV,
            V,
            VI,
            VII,
            VIII
        }

        """
        The Pokémon types.
        """
        enum Type {
            NORMAL,
            FIRE,
            FIGHTING,
            WATER,
            FLYING,
            GRASS,
            POISON,
            ELECTRIC,
            GROUND,
            PSYCHIC,
            ROCK,
            ICE,
            BUG,
            DRAGON,
            GHOST,
            DARK,
            STEEL,
            FAIRY
        }

        """
        Pokémon team parameters.
        """
        input TeamConfig {
            "Of which generations should come Pokémon of the team."
            generations: [Generation]
            "How many Pokémon we want in the team."
            numberOfPokemon: Int
            "The types of the Pokemon of the team. If empty, all types are considered."
            types: [Type]
        }

        """
        Pokémon's move.
        """
        type Move {
            accuracy: Int
            power: Int
            pp: Int
            type: String
            name: String
        }

        """
        The Pokémon names in english and japanese (optional).
        """
        type PokemonNames {
            english: String!,
            japanese: String
        }

        """
        Our favorite pocket monsters.
        """
        type Pokemon {
            id: Int!
            names: PokemonNames!
            frontSprite: String
            officialArtwork: String
            types: [Type]!
            moves: [Move!]
            allMoveNames: [String]
            isLocked: Boolean
        }

        """
        A generated Pokémon team.
        """
        type Team {
            pokemon: [Pokemon]!
        }

        input PokemonNamesInput {
            english: String!,
            japanese: String
        }

        input MoveInput {
            accuracy: Int
            power: Int
            pp: Int
            type: String
            name: String
        }

        input PokemonInput {
            id: Int!
            names: PokemonNamesInput!
            frontSprite: String
            officialArtwork: String
            types: [Type]!
            moves: [MoveInput!]
            allMoveNames: [String]
            isLocked: Boolean
        }

        input TeamInput {
            "The Pokemon team to update."
            pokemon: [PokemonInput]!
        }

        type Query {
            createTeamRandomly(parameters: TeamConfig): Team
            updateTeamRandomly(parameters: TeamConfig, team: TeamInput): Team
        }

        schema {
            query: Query
        }
    `);

export default schema;
