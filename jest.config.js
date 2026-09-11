module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)', '**/*.test.[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/api-books-v2/', '/dist/'],
  setupFiles: ['<rootDir>/__tests__/helpers/setup.ts'],
  // The first render of a suite pays the Expo module graph; 5 s is not enough on a cold worker.
  testTimeout: 15000,
  collectCoverageFrom: ['domain/**/*.{ts,tsx}', 'services/**/*.{ts,tsx}'],
  passWithNoTests: true,
};
