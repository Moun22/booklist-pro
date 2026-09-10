module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)', '**/*.test.[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/api-books-v2/', '/dist/'],
  collectCoverageFrom: ['domain/**/*.{ts,tsx}', 'services/**/*.{ts,tsx}'],
  passWithNoTests: true,
};
