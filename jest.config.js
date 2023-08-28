module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['<rootDir>/test'],
  testEnvironment: 'node',
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
