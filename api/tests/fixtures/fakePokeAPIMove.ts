import { MovePAPI } from '../../src/infrastructure/pokeApi/models/move';

export const fakePokeAPIMoveHyperBeam: MovePAPI = {
    accuracy: 90,
    power: 150,
    pp: 5,
    type: {
        name: 'normal',
        url: 'http://hyper_beam_url'
    },
    name: 'hyper-beam'
};
