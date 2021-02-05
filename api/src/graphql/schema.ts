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
            name: String
        }

        """
        A generated Pokémon team.
        """
        type Team {
            pokemons: [Pokemon]!
        }

        type Query {
            getTeam(parameters: TeamParameters): Team
        }

        schema {
            query: Query
        }
    `);

export default schema;
