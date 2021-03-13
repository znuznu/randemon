module.exports = {
    roots: ['<rootDir>/tests'],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    testMatch: ['**/src/**/*.spec.ts', '**/tests/**/*.spec.ts']
};
