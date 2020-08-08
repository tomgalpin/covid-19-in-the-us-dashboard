module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6
  },
  extends: ['plugin:prettier/recommended', 'prettier', 'prettier/vue'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error']
  }
};
