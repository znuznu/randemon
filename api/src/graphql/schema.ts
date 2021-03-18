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
            "Of which generations should come Pokémon of the team"
            generations: [Generation]
            "How many Pokémon we want in the team"
            numbersOfPokemon: Int
            "The type of the Pokemon of the team."
            type: Type
        }

        type Move {
            accuracy: Int
            power: Int
            pp: Int
            type: String
            name: String
        }

        """
        Our favorite pocket monsters.
        """
        type Pokemon {
            id: Int!
            name: String!
            frontSprite: String
            officialArtwork: String
            types: [Type]!
            moves: [Move!]
            allMovesNames: [String]
        }

        """
        A generated Pokémon team.
        """
        type Team {
            pokemon: [Pokemon]!
        }

        type Query {
            getRandomTeam(parameters: TeamConfig): Team
        }

        schema {
            query: Query
        }
    `);

export default schema;
