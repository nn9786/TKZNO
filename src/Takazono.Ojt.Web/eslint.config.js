// eslint.config.js
import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import storybookPlugin from 'eslint-plugin-storybook'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'storybook-static/**', 'src/api/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,

  ...storybookPlugin.configs['flat/recommended'],

  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.app.json', './tsconfig.node.json'],
        },
        node: true,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,

      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message: "Don't declare enums",
        },
      ],
      'prefer-arrow-callback': 'error',
      'func-style': ['error', 'expression'],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'import/newline-after-import': 'error',
      'import/no-default-export': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: ['./', '../'],
        },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',
      'no-empty-function': 'off',
      'no-shadow': 'off',
      'no-array-constructor': 'off',
      'no-redeclare': 'off',
      'default-param-last': 'off',
      'require-await': 'off',
      'no-loss-of-precision': 'off',
      'no-unexpected-multiline': 'off',
      'no-undef': 'off',
      'no-control-regex': 'off',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    },
  },
  {
    files: ['src/store/slice/**/*.ts'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    files: [
      '.storybook/**/*.{ts,tsx}',
      '**/*.stories.{ts,tsx}',
      'vite.config.ts',
      'eslint.config.js',
      '*.config.{js,ts}',
    ],
    rules: {
      'import/no-default-export': 'off',
      'no-restricted-imports': 'off',
    },
  },
  eslintConfigPrettier
)
