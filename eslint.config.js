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
      'allowSingleLineBlocks': 'off',
      'brace-style': 'off',
      'curly': 'off',
      'one-var': 'off',
      'padded-blocks': 'off',
      'prefer-const': 'off',
      'prefer-promise-reject-errors': 'off',
      'no-extra-boolean-cast': 'off',
      'no-extra-parens': 'off',
      'no-prototype-builtins': 'off',
      'no-trailing-spaces': 'off',
      'no-undef': 'off',
      'semi': 'off',
      'space-before-function-paren': 'off'
    }
  }
];
