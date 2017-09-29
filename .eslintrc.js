module.exports = {
  'extends': ['eslint:recommended', 'google'],
  'parser': 'babel-eslint',
  'env': {
    'es6': true,
    'node': true,
  },
  'rules': {
    'require-jsdoc': 0,
    'react/jsx-uses-vars': 2,
    'react/jsx-uses-react': 2,
    'indent': ['error', 2],
  },
  'plugins': [
    'react',
  ],
};
