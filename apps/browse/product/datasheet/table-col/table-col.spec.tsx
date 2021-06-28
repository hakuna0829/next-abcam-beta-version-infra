import React from 'react'
import { render, screen } from '@browse/test-utils'

import { TableCol } from '@browse/product/datasheet/table-col/table-col'

describe('TableCol', () => {
  it('should display the heading', () => {
    render(<TableCol heading="Hello" content="World" />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('should display the content', () => {
    render(<TableCol heading="Hello" content="World" />)
    expect(screen.getByText('World')).toBeInTheDocument()
  })
})
