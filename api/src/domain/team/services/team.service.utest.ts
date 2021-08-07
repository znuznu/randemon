import { fakeRandemonMoveNames } from '../../../../tests/fixtures/fakeRandemonMove';
import * as Utils from '../../../utils';
import TeamService from './team.service';

jest.mock('../../../utils');

describe('Team service - unit', () => {
    describe('#getRandomTeamIds', () => {
        describe('when the amount is 0', () => {
            it('should return an empty array', () => {
                expect(
                    TeamService.getRandomTeamIds([1, 5, 9, 8, 150, 478], 0)
                ).toHaveLength(0);
            });
        });

        describe('when the provided pokemon ids array is empty', () => {
            it('should return an empty array', () => {
                expect(TeamService.getRandomTeamIds([], 15)).toHaveLength(0);
            });
        });

        describe('when the amount is greater than the provided ids array length', () => {
            beforeEach(() => {
                jest.spyOn(Utils, 'getRandomNumberInRange')
                    .mockReturnValueOnce(0) //  [ 5, 9, 8, 150, 478]
                    .mockReturnValueOnce(2) //  [ 5, 9, 150, 478]
                    .mockReturnValueOnce(1) //  [ 5, 150, 478]
                    .mockReturnValueOnce(2) //  [ 5, 150]
                    .mockReturnValueOnce(0) //  [ 150 ]
                    .mockReturnValueOnce(0); // [ ]
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should return an array with all the provided ids', () => {
                expect(TeamService.getRandomTeamIds([1, 5, 9, 8, 150, 478], 10)).toEqual([
                    1,
                    8,
                    9,
                    478,
                    5,
                    150
                ]);
            });
        });

        describe('when the amount is less than the provided ids array length', () => {
            beforeEach(() => {
                jest.spyOn(Utils, 'getRandomNumberInRange')
                    .mockReturnValueOnce(0) //  [ 5, 9, 8, 150, 478]
                    .mockReturnValueOnce(2) //  [ 5, 9, 150, 478]
                    .mockReturnValueOnce(1); // [ 5, 150, 478]
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should return an array with all the provided ids', () => {
                expect(TeamService.getRandomTeamIds([1, 5, 9, 8, 150, 478], 3)).toEqual([
                    1,
                    8,
                    9
                ]);
            });
        });
    });

    describe('#getRandomMoveNames', () => {
        describe('when the number of moves is 0', () => {
            it('should return an empty array', () => {
                expect(
                    TeamService.getRandomMoveNames(fakeRandemonMoveNames, 0)
                ).toHaveLength(0);
            });
        });

        describe('when the array of move names is empty', () => {
            it('should return an empty array', () => {
                expect(TeamService.getRandomMoveNames([], 5)).toHaveLength(0);
            });
        });

        describe('when the number of move is greater than the number of move names', () => {
            it('should return the full array', () => {
                expect(
                    TeamService.getRandomMoveNames(fakeRandemonMoveNames, 10)
                ).toEqual([
                    'hyper-beam',
                    'mega-punch',
                    'fire-punch',
                    'thunder-punch',
                    'scratch',
                    'ember',
                    'slash'
                ]);
            });
        });

        describe("when there's move names", () => {
            beforeEach(() => {
                jest.spyOn(Utils, 'getRandomNumberInRange')
                    .mockReturnValueOnce(0) //  'mega-punch', 'fire-punch', 'thunder-punch', 'scratch', 'ember', 'slash'
                    .mockReturnValueOnce(2) //  'mega-punch', 'fire-punch', 'scratch', 'ember', 'slash'
                    .mockReturnValueOnce(1) //  'mega-punch', 'scratch', 'ember', 'slash'
                    .mockReturnValueOnce(1) //  'mega-punch', 'ember', 'slash'
                    .mockReturnValueOnce(2); // 'mega-punch', 'ember'
            });

            it('should return an array containing moves', () => {
                expect(TeamService.getRandomMoveNames(fakeRandemonMoveNames, 5)).toEqual([
                    'hyper-beam',
                    'thunder-punch',
                    'fire-punch',
                    'scratch',
                    'slash'
                ]);
            });
        });
    });
});
