module.exports = {
  displayName: 'checkout-shared',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/mocks/svg-loader.js',
  },
  coverageDirectory: '../../coverage/libs/checkout-shared',
}
