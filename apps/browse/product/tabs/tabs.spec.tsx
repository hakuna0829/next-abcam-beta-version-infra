import React from 'react'
import { render, screen } from '@browse/test-utils'

import { Tabs } from '@browse/product/tabs/tabs'
import { Tab } from './tabs.type'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '',
    }
  },
}))

const items: Tab[] = [{ id: 'overview', label: 'Overview' }]

describe('Tab', () => {
  it('should display a link', () => {
    render(<Tabs items={items} productCode="123" />)
    expect(screen.getByText('Overview')).toBeInTheDocument()
  })
})
