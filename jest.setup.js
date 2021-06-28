jest.mock('next/config', () => () => {
  return {
    publicRuntimeConfig: require('@browse/mocks/data/environment.mock.json'),
  }
})
