import React from 'react'
import { render, screen, userEvent } from '@browse/test-utils'

import { PrintDatasheet } from './print-datasheet'

describe('PrintDatasheet', () => {
  it('should call onClick when the button is pressed', () => {
    const mockOnClick = jest.fn()
    render(<PrintDatasheet onClick={mockOnClick}></PrintDatasheet>)

    userEvent.click(screen.getByRole('button'))
    expect(mockOnClick).toBeCalled()
  })
})
