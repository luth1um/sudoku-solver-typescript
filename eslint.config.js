import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(js.configs.recommended, ...tseslint.configs.recommended, eslintConfigPrettier, {
  // needs to be in its own object to act as global ignore
  ignores: ['dist', '*.cjs'],
});
