module.exports = {
  displayName: 'browse',
  preset: '../../jest.preset.js',
  setupFiles: ['../../jest.setup.js'],
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  collectCoverageFrom: ['**/*.ts', '**/*.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/browse',
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/mocks/svg-loader.js',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
}
