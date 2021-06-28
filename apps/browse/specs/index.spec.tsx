import React from 'react'
import { render } from '@browse/test-utils'

import Homepage from '@browse/pages/index'

jest.mock('next/config', () => () => {
  return {
    publicRuntimeConfig: require('@browse/mocks/data/environment.mock.json'),
  }
})

describe('Homepage', () => {
  it.skip('should render successfully', async () => {
    const { baseElement } = render(<Homepage />)
    expect(baseElement).toBeTruthy()
  })
})
