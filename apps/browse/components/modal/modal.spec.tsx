import React from 'react'
import { render, screen, userEvent } from '@browse/test-utils'

import { Modal } from './modal'

describe('Modal', () => {
  it('should display when show is true', () => {
    const mockOnClose = jest.fn()
    render(
      <>
        <div id="modal"></div>
        <Modal header="Title" onClose={(): null => null} show={true}>
          <hr />
        </Modal>
      </>
    )

    expect(screen.getByText('Title')).toBeInTheDocument()
  })

  it('should call onClose when ESC is pressed', () => {
    const mockOnClose = jest.fn()
    render(
      <>
        <div id="modal"></div>
        <Modal header="Title" onClose={mockOnClose} show>
          <hr />
        </Modal>
      </>
    )

    userEvent.keyboard('{esc}')
    expect(mockOnClose).toBeCalled()
  })

  it('should call onClose when modal is closed', () => {
    const mockOnClose = jest.fn()
    render(
      <>
        <div id="modal"></div>
        <Modal header="Title" onClose={mockOnClose} show>
          <hr />
        </Modal>
      </>
    )

    userEvent.click(screen.getByRole('button'))
    expect(mockOnClose).toBeCalled()
  })

  it('should call onClose when clicked outside of the dialog', () => {
    const mockOnClose = jest.fn()
    render(
      <>
        <div id="modal"></div>
        <Modal header="Title" onClose={mockOnClose} show>
          <hr />
        </Modal>
      </>
    )

    userEvent.click(screen.getByRole('dialog').parentElement!)
    expect(mockOnClose).toBeCalled()
  })
})
