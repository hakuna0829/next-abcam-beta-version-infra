import React from 'react'
import { render, screen } from '@testing-library/react'
import { Dropdown, Select } from '@abcam-web/lego-shared-components/lib'
import {
  mockDropdownData,
  mockDropdownDataWithShortDisplayValue,
} from '@abcam-web/lego-shared-components/lib/dropdown/stories/mocks'
import { DropdownVariant } from '@abcam-web/lego-shared-components/lib/dropdown/dropdown.type'
import userEvent from '@testing-library/user-event'

describe('The dropdown element', () => {
  describe('Snapshots', () => {
    it('Matches the snapshot when the data does not have a short display value', () => {
      const { container } = render(
        <Dropdown onChange={() => true} options={mockDropdownData}>
          <span>test</span>
        </Dropdown>
      )

      expect(container).toMatchSnapshot()
    })
    it('Matches the snapshot when the data has a short display value', () => {
      const { container } = render(
        <Dropdown
          onChange={() => true}
          options={mockDropdownDataWithShortDisplayValue}
        >
          <span>test</span>
        </Dropdown>
      )

      expect(container).toMatchSnapshot()
    })

    it('Matches the snapshot when the secondary variant is specified', () => {
      const { container } = render(
        <Dropdown
          onChange={() => true}
          options={mockDropdownDataWithShortDisplayValue}
          variant={DropdownVariant.secondary}
        >
          <span>test</span>
        </Dropdown>
      )

      expect(container).toMatchSnapshot()
    })
  })

  describe('Before the dropdown is clicked', () => {
    it('Does not display its child component', () => {
      render(
        <Dropdown
          onChange={() => true}
          options={mockDropdownDataWithShortDisplayValue}
          variant={DropdownVariant.secondary}
        >
          <input aria-label={'filter-list'} />
        </Dropdown>
      )

      const inputItem = screen.queryAllByLabelText('filter-list')
      expect(inputItem).toEqual([])
    })
  })

  describe('When the dropdown is clicked', () => {
    it('Displays its child component', () => {
      render(
        <Dropdown
          onChange={() => true}
          options={mockDropdownDataWithShortDisplayValue}
          variant={DropdownVariant.secondary}
        >
          <input aria-label={'filter-list'} />
        </Dropdown>
      )
      const clickElement = screen.getByText(
        mockDropdownDataWithShortDisplayValue[0].shortDisplayValue
      )
      userEvent.click(clickElement)

      const inputElement = screen.getByLabelText('filter-list')
      expect(inputElement).not.toBeNull()
    })
  })
})
