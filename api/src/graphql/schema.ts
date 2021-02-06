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
        input TeamParameters {
            "Of which generations should come Pokémons of the team"
            generations: [Generation]
            "How many Pokémons we want in the team"
            numbersOfPokemons: Int
        }

        """
        Our favorite pocket monsters.
        """
        type Pokemon {
            id: Int
            name: String
            frontSprite: String
            types: [Type]
        }

        """
        A generated Pokémon team.
        """
        type Team {
            pokemons: [Pokemon]!
        }

        type Query {
            getRandomTeam(parameters: TeamParameters): Team
        }

        schema {
            query: Query
        }
    `);

export default schema;
