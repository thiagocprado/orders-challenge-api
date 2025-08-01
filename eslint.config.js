import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginJest from 'eslint-plugin-jest';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      prettier: eslintPluginPrettier,
      jest: eslintPluginJest,
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',

      'prettier/prettier': 'warn',
    },
  },
];
