const eslintPluginPrettier = require('eslint-plugin-prettier');
const eslintPluginPromise = require('eslint-plugin-promise');
const babelParser = require('@babel/eslint-parser');

module.exports = [
  {
    ignores: ['*.less', 'api/**', 'dist/**', 'node_modules/**', 'src/skins/**', 'test/**'],
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 'latest',
    },
    plugins: {
      prettier: eslintPluginPrettier,
      promise: eslintPluginPromise,
    },
    rules: {
      ...eslintPluginPromise.configs.recommended.rules,
      'allowSingleLineBlocks': 0,
      'brace-style': 0,
      'curly': 0,
      'one-var': 0,
      'padded-blocks': 0,
      'prefer-const': 0,
      'prefer-promise-reject-errors': 0,
      'no-extra-boolean-cast': 0,
      'no-extra-parens': 0,
      'no-prototype-builtins': 0,
      'no-trailing-spaces': 0,
      'no-undef': 0,
      'semi': 0,
      'space-before-function-paren': 0
    }
  }
];
