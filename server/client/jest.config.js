/* eslint-disable no-useless-escape */
module.exports = {
  transformIgnorePatterns: ['node_modules/(?!\@?axios)'],
  automock: false,
  setupFiles: [
    './setupJest.js',
  ],
  testEnvironment: 'jsdom',
};
