module.exports = {
  'root': true,
  'env': {
    'es6': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'google',
  ],
  'parserOptions': {
    'sourceType': 'module',
  },
  'rules': {
    'indent': ['error', 2],
    'require-jsdoc': 'off',
  },
  'overrides': [
    // backend
    {
      'files': ['**/server/**/*.js'],
      'rules': {
        'no-console': 'off',
      },
    },
    // backend-test
    {
      'files': ['**/test/server/**/*.js'],
      'env': {
        'mocha': true,
      },
    },
    // frontend
    {
      'files': ['**/client/**/*.js'],
      'env': {
        'browser': true,
        'node': false,
      },
      'parserOptions': {
        'ecmaFeatures': {
          'experimentalObjectRestSpread': true,
          'jsx': true,
        },
      },
      'rules': {
        'react/jsx-uses-vars': 'error',
        'react/jsx-uses-react': 'error',
      },
      'plugins': [
        'react',
      ],
    },
    // frontend-test
    {
      'files': ['**/test/client/**/*.js'],
      'env': {
        'jest': true,
      },
    },
  ],
};
