module.exports = {
  displayName: 'lego-shared-components',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/mocks/svg-loader.js',
  },
  coverageDirectory: '../../coverage/libs/lego-shared-components',
}
