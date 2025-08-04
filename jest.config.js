export default {
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/__tests__/**/*.spec.js',
    '**/*.test.js',
    '**/*.spec.js',
  ],
  transform: {},
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/configs/**',
    '!src/utils/**',
    '!src/commons/**',
    '!src/enums/**',
    '!src/middlewares/**',
    '!src/**/index.js',
    '!src/**/*.test.js',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testTimeout: 10000,
  verbose: true,
};
