module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'unused-imports', 'prettier'],
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'standard-with-typescript',
    'prettier'
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.ts']
      }
    }
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-console': 'warn',
    'no-return-await': 'error',
    'unused-imports/no-unused-imports': 'error',
    'no-use-before-define': 'error',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'import/extensions': 0,
    '@typescript-eslint/no-redeclare': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    radix: 'off',
    '@typescript-eslint/return-await': 'off',
    'no-param-reassign': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn'
  }
};
