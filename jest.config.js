const jestConfig = require('ada-scripts/jest')

const newConfig = Object.assign(jestConfig, {
  roots: ['./src'],
  displayName: 'useComponentSize',
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 100,
      functions: 80,
      lines: 100,
    },
  },
})
module.exports = newConfig
