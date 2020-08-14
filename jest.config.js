module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/{components,router,store,views}/**/*.{vue,js}',
    // these are internal testing pages
    '!<rootDir>/views/{test,testing}.vue'
  ],
  coverageDirectory: '<rootDir>/test/coverage',
  coverageReporters: ['json-summary', 'text', 'lcov', 'text-summary'],
  setupFiles: ['jest-canvas-mock'],
  moduleFileExtensions: ['js', 'ts', 'vue', 'json'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|ttf|woff|woff2)$': 'jest-transform-stub',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^vue$': 'vue/dist/vue.common.js',
    '^~/(.*)$': '<rootDir>/$1'
  },
  transform: {
    '.+\\.(css|styl|less|sass|scss|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest'
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!vue-declarative-animation/)'
  ]
};
