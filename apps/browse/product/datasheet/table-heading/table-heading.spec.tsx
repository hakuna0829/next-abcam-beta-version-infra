import React from 'react'
import { render, screen } from '@browse/test-utils'

import { TableHeading } from '@browse/product/datasheet/table-heading/table-heading'

describe('TableHeading', () => {
  it('should display the heading', () => {
    render(<TableHeading heading="Hello" />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
