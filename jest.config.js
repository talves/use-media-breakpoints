const jestConfig = require('ada-scripts/jest')

const newConfig = Object.assign(jestConfig, {
  roots: ['./src'],
  displayName: 'useMediaBreakpoints',
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 50,
      functions: 100,
      lines: 80,
    },
  },
})
module.exports = newConfig
