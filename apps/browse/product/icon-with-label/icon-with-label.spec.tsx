import React from 'react'
import { render, screen } from '@browse/test-utils'

import { IconWithLabel } from '@browse/product/icon-with-label/icon-with-label'

describe('IconWithLabel', () => {
  it('should display the title', () => {
    render(<IconWithLabel title="Hello" icon={<svg />} />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('should display the icon', () => {
    render(
      <IconWithLabel title="Hello" icon={<svg data-testid="test-icon" />} />
    )
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })
})
