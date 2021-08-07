import { SpeciesPAPI } from '../../src/infrastructure/pokeApi/models/species';

export const fakePokeAPISpeciesCharizard: SpeciesPAPI = {
    id: 6,
    name: 'charizard',
    names: [
        {
            language: {
                name: 'ja-Hrkt',
                url: 'https://pokeapi.co/api/v2/language/1/'
            },
            name: 'リザードン'
        },
        {
            language: {
                name: 'roomaji',
                url: 'https://pokeapi.co/api/v2/language/2/'
            },
            name: 'Lizardon'
        },
        {
            language: {
                name: 'ko',
                url: 'https://pokeapi.co/api/v2/language/3/'
            },
            name: '리자몽'
        }
    ]
};
