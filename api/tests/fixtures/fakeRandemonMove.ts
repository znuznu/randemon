import { Move } from '../../src/models/randemon/move';

export const fakeRandemonMoveHyperBeam: Move = {
    accuracy: 90,
    power: 150,
    pp: 5,
    type: 'NORMAL',
    name: 'hyper-beam'
};

export const fakeRandemonMoveScratch: Move = {
    accuracy: 90,
    power: 70,
    pp: 5,
    type: 'NORMAL',
    name: 'scratch'
};

export const fakeRandemonMoveMegaPunch: Move = {
    accuracy: 90,
    power: 120,
    pp: 5,
    type: 'FIGHT',
    name: 'scratch'
};

export const fakeRandemonMoveEmber: Move = {
    accuracy: 90,
    power: 50,
    pp: 5,
    type: 'FIRE',
    name: 'ember'
};

export const fakeRandemonMoveNames: string[] = [
    'hyper-beam',
    'mega-punch',
    'fire-punch',
    'thunder-punch',
    'scratch',
    'ember',
    'slash'
];
