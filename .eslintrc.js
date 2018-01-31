module.exports = {
  root: true,
  extends: 'eslint:recommended',
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true,
  },
  rules: {
    semi: [2, 'never'],
    indent: [2, 2],
  },
  parser: 'babel-eslint',
}
