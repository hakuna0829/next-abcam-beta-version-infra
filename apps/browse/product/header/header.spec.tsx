import React from 'react'
import { render, screen, userEvent } from '@browse/test-utils'

import { Header } from './header'

describe('Header', () => {
  describe('with title', () => {
    it('should display the title', () => {
      render(<Header title="Hello"></Header>)
      expect(screen.getByText('Hello')).toBeInTheDocument()
    })

    it('should not display the download button', () => {
      render(<Header title="Hello" />)
      expect(screen.queryByText('Download')).not.toBeInTheDocument()
    })
  })

  describe('with download', () => {
    it('should display the download button', () => {
      const onDownloadMock = jest.fn()

      render(<Header title="Hello" onDownload={onDownloadMock} />)
      expect(screen.queryByText('Download')).toBeInTheDocument()
    })

    it('should call the onDownload function when clicked', () => {
      const mockOnDownload = jest.fn()

      render(<Header title="Hello" onDownload={mockOnDownload} />)

      userEvent.click(screen.queryByText('Download')!)
      expect(mockOnDownload).toHaveBeenCalled()
    })
  })
})
