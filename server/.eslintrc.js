module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'no-unused-vars': 0,
    camelcase: 'off',
    quotes: "off",
    "react/prop-types": "off",
  },
};
