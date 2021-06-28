import React from 'react'
import {
  findByText,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { mockDropdownData } from '@abcam-web/lego-shared-components/lib/dropdown/stories/mocks'
import { DropdownListWithSearch } from '@abcam-web/lego-shared-components/lib/dropdown/dropdownListWithSearch/dropdownListWithSearch'
import userEvent, { specialChars } from '@testing-library/user-event'
import { filterArrayByText } from '@abcam-web/lego-shared-components/lib/utils/filterArrayByText'
import { keyboardKey } from '@testing-library/user-event/dist/keyboard'

describe('The dropdownListWithSearch element', () => {
  describe('Snapshots', () => {
    it('Matches the snapshot', () => {
      const { container } = render(
        <DropdownListWithSearch
          title={'my title'}
          searchPlaceholder={'my placeholder'}
        />
      )
      expect(container).toMatchSnapshot()
    })
  })

  describe('When the user types in the search input', () => {
    it('Renders a list of options filtered by the search input value', () => {
      render(
        <DropdownListWithSearch
          title={'my title'}
          searchPlaceholder={'my placeholder'}
          options={mockDropdownData}
          onValueSelect={jest.fn()}
        />
      )
      const inputElement = screen.getByRole('textbox')
      fireEvent.change(inputElement, { target: { value: 'belg' } })
      const itemList = screen.getAllByRole('listitem')
      expect(itemList).toHaveLength(1)
    })

    it('Limits the number of results to 6', () => {
      const fakeData = []
      for (let i = 0; i < 7; i++) {
        fakeData.push({
          key: i.toString(),
          displayValue: 'eee',
        })
      }
      render(
        <DropdownListWithSearch
          title={'my title'}
          searchPlaceholder={'my placeholder'}
          options={fakeData}
          onValueSelect={jest.fn()}
        />
      )
      const inputElement = screen.getByRole('textbox')
      fireEvent.change(inputElement, { target: { value: 'e' } })
      const itemList = screen.getAllByRole('listitem')
      expect(itemList).toHaveLength(6)
    })

    it('Displays a message if there is no result', () => {
      const fakeData = []
      for (let i = 0; i < 7; i++) {
        fakeData.push({
          key: i.toString(),
          displayValue: 'eee',
        })
      }
      render(
        <DropdownListWithSearch
          title={'my title'}
          searchPlaceholder={'my placeholder'}
          options={fakeData}
          onValueSelect={jest.fn()}
        />
      )
      const inputElement = screen.getByRole('textbox')
      fireEvent.change(inputElement, { target: { value: 'a' } })
      const itemList = screen.queryAllByRole('listitem')
      expect(itemList).toHaveLength(0)
      const errorMessage = screen.findByText('No results')
      expect(errorMessage).toBeDefined()
    })
  })

  describe('When the user selects an option', () => {
    it('calls the parent callback on click', () => {
      const callback = jest.fn()
      render(
        <DropdownListWithSearch
          title={'my title'}
          searchPlaceholder={'my placeholder'}
          options={mockDropdownData}
          onValueSelect={callback}
        />
      )
      const inputElement = screen.getByRole('textbox')
      fireEvent.change(inputElement, { target: { value: 'belg' } })

      const item = screen.getByText('Belgium')
      userEvent.click(item)
      expect(callback).toHaveBeenCalled()
    })

    it('calls the parent callback on enter', () => {
      const callback = jest.fn()
      render(
        <DropdownListWithSearch
          title={'my title'}
          searchPlaceholder={'my placeholder'}
          options={mockDropdownData}
          onValueSelect={callback}
        />
      )
      const inputElement = screen.getByRole('textbox')
      fireEvent.change(inputElement, { target: { value: 'belg' } })

      const item = screen.getByText('Belgium')
      fireEvent.keyUp(item, {
        code: 'Enter',
        key: 'Enter',
      })
      expect(callback).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('Focusses on the list when the user presses tab', () => {
      render(
        <DropdownListWithSearch
          title={'my title'}
          searchPlaceholder={'my placeholder'}
          options={mockDropdownData}
          onValueSelect={jest.fn()}
        />
      )
      const inputElement = screen.getByRole('textbox')
      fireEvent.change(inputElement, { target: { value: 'e' } })

      const firstElement = screen.getByText(mockDropdownData[0].displayValue)
      spyOn(firstElement, 'focus')

      userEvent.tab()
      expect(firstElement.focus).toHaveBeenCalled()
    })

    it('is navigable with the arrows', () => {
      render(
        <DropdownListWithSearch
          title={'my title'}
          searchPlaceholder={'my placeholder'}
          options={mockDropdownData}
          onValueSelect={jest.fn()}
        />
      )
      const inputElement = screen.getByRole('textbox')
      fireEvent.change(inputElement, { target: { value: 'e' } })

      const expectedList = filterArrayByText(
        mockDropdownData,
        'e',
        'displayValue'
      )

      const secondElement = screen.getByText(expectedList[1].displayValue)
      spyOn(secondElement, 'focus')

      userEvent.tab()
      userEvent.keyboard(`${specialChars.arrowDown}`)
      userEvent.keyboard(`${specialChars.arrowDown}`)

      expect(secondElement.focus).toHaveBeenCalled()
    })
  })
})
