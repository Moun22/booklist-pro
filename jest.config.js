module.exports = {
  preset: 'jest-expo',
  testPathIgnorePatterns: ['/node_modules/', '/api-books-v2/', '/dist/'],
  collectCoverageFrom: ['domain/**/*.{ts,tsx}', 'services/**/*.{ts,tsx}'],
  passWithNoTests: true,
};
