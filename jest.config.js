// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  roots: ['<rootDir>/src'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  collectCoverageFrom: ['**/src/**/*.ts', '!**/src/main/**'],
  preset: '@shelf/jest-mongodb',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
}
