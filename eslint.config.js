import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettierConfig,
    ],
    plugins: {
      prettier: prettierPlugin,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      'prettier/prettier': 'error',
      'simple-import-sort/imports': ['error', {
        groups: [
          ["^\\u0000"],
          ["^react$", "^react\\b"],
          [
            "^@?\\w.*\\/react\\b",
            "^@tanstack\\/react-",
            "^(react-)",
          ],
          ["^@?\\w"],
          ["^@\\/","^src\\/"],
          ["^\\.\\.(?!/?$)", "^\\.\\./?$", "^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          ["^.+\\.(css|scss|sass|less)$"],
        ],
      }],
      'simple-import-sort/exports': 'error',
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    }
  }
]);
