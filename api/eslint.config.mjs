import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import unicornPlugin from 'eslint-plugin-unicorn';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import promisePlugin from 'eslint-plugin-promise';
import securityPlugin from 'eslint-plugin-security';

export default [
  {
    files: ['**/*.ts'],
    ignores: ['*.config*.mts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
      unicorn: unicornPlugin,
      sonarjs: sonarjsPlugin,
      promise: promisePlugin,
      security: securityPlugin,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts'],
        },
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
      ],
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      'no-template-curly-in-string': 'error',
      'no-unreachable': 'error',
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      'no-constant-condition': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'require-await': 'error',
      'no-return-await': 'error',
      'no-await-in-loop': 'off',
      'arrow-body-style': ['error', 'as-needed'],
      'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
      'no-var': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-destructuring': ['error', { array: true, object: true }],
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      radix: 'error',
      yoda: 'error',
      'import/no-cycle': 'error',
      'import/no-unresolved': 'error',
      'import/no-extraneous-dependencies': 'error',
      'import/order': ['error', { 'newlines-between': 'always', alphabetize: { order: 'asc' } }],
      'no-restricted-imports': [
        'error',
        {
          patterns: ['src/'],
        },
      ],
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: true,
            pascalCase: true,
          },
        },
      ],
      'sonarjs/no-duplicate-string': ['error', { threshold: 5 }],
      'sonarjs/cognitive-complexity': ['error', 15],
      'promise/always-return': 'error',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/catch-or-return': 'error',
      'promise/no-nesting': 'warn',
      'promise/no-promise-in-callback': 'warn',
      'promise/no-callback-in-promise': 'warn',
      'promise/no-new-statics': 'error',
      'promise/valid-params': 'warn',
      'security/detect-object-injection': 'warn',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-unsafe-regex': 'error',
      'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
      'max-depth': ['error', 3],
      complexity: ['error', 10],
    },
  },
  {
    // overwrite for test files
    files: ['**/*.test.ts', '**/*.spec.ts', '**/test/**/*.ts'],
    rules: {
      'max-lines-per-function': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'promise/valid-params': 'off',
      'sonarjs/no-duplicate-string': 'off',
    },
  },
];
