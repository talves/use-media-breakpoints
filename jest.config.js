const jestConfig = require('ada-scripts/jest')

const newConfig = Object.assign(jestConfig, {
  roots: ['./src'],
  displayName: 'useMediaBreakpoints',
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 90,
      functions: 100,
      lines: 100,
    },
  },
})
module.exports = newConfig
