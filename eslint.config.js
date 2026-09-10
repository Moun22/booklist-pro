const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier');

const SERVICES = ['**/services', '**/services/**'];
const FEATURES = ['**/features', '**/features/**'];
const SERVER_STATE = ['@tanstack/react-query'];

function forbidImports(patterns, message) {
  return {
    'no-restricted-imports': ['error', { patterns: [{ group: patterns, message }] }],
  };
}

const forbidNetworkCalls = {
  'no-restricted-globals': [
    'error',
    { name: 'fetch', message: 'Network calls live in services/. Use a hook from features/.' },
    { name: 'XMLHttpRequest', message: 'Network calls live in services/.' },
  ],
};

module.exports = defineConfig([
  expoConfig,
  prettierConfig,
  {
    ignores: ['api-books-v2/**', 'dist/**', '.expo/**', 'coverage/**'],
  },
  {
    rules: {
      'no-console': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    files: ['app/**/*.{ts,tsx}'],
    rules: {
      ...forbidNetworkCalls,
      ...forbidImports(
        [...SERVICES, ...SERVER_STATE],
        'Screens never reach services/ or the query client directly: use a hook from features/.',
      ),
    },
  },
  {
    files: ['components/**/*.{ts,tsx}'],
    rules: {
      ...forbidNetworkCalls,
      ...forbidImports(
        [...SERVICES, ...FEATURES, ...SERVER_STATE],
        'components/ is pure UI: data and callbacks arrive through props.',
      ),
    },
  },
  {
    files: ['domain/**/*.ts'],
    rules: {
      ...forbidImports(
        ['react', 'react-native', 'react-native/**', 'expo*', 'expo*/**', '@expo/**', ...SERVICES, ...FEATURES],
        'domain/ holds business rules only: no React, no Expo, no services.',
      ),
    },
  },
]);
