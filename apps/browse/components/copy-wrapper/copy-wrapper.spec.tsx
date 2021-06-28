import React from 'react'
import { render, screen, userEvent, waitFor } from '@browse/test-utils'

import { CopyWrapper } from './copy-wrapper'

jest.mock('copy-to-clipboard')

describe('CopyWrapper', () => {
  it('should show the default text', () => {
    render(
      <CopyWrapper copyValue="test">
        <div />
      </CopyWrapper>
    )

    expect(screen.getByText('Click to copy')).toBeInTheDocument()
  })

  it('should update the text when the button is clicked', async () => {
    render(
      <CopyWrapper copyValue="test">
        <div>Copy me!</div>
      </CopyWrapper>
    )

    userEvent.click(screen.getByRole('button'))

    await waitFor(() => expect(screen.getByText('Copied!')).toBeInTheDocument())
  })
})
