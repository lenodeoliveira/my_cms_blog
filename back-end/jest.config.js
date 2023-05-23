module.exports = {

    roots: ['<rootDir>/tests'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts'
    ],
    coverageDirectory: 'coverage',
    collectCoverage: true,
    coverageProvider: 'v8',
    testEnvironment: 'node',
    transform: {
        '.+\\.ts$': 'ts-jest'
    },
    moduleNameMapper: {
        '@/tests/(.*)': '<rootDir>/tests/$1',
        '@/(.*)': '<rootDir>/src/$1'
    },
}
