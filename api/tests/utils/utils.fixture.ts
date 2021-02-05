export interface UtilsFixture {
    range: [number, number];
    expectedIndexes: number[];
}

export const utilsFixtures: UtilsFixture[] = [
    {
        range: [0, 10],
        expectedIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    {
        range: [5, 10],
        expectedIndexes: [5, 6, 7, 8, 9, 10]
    },
    {
        range: [0, 0],
        expectedIndexes: [0]
    }
];
