import { screen, fireEvent, render } from '@testing-library/react'
import React from 'react'
import { SelectOption } from './select.type'
import userEvent from '@testing-library/user-event'
import { Select } from '@abcam-web/lego-shared-components/lib'

const numberRange: SelectOption[] = []
for (let i = 1; i <= 10; i++) {
  numberRange.push({ key: i, displayValue: `value ${i}` })
}

describe('The select element', () => {
  describe('Snapshots', () => {
    it('Matches the snapshot on initial state', () => {
      const { container } = render(
        <Select options={numberRange} onChange={() => true} />
      )
      expect(container.firstChild).toMatchSnapshot()
    })

    it('Matches the snapshot when opened', () => {
      const { container } = render(
        <Select options={numberRange} onChange={() => true} />
      )
      const clickElement = screen.getByText('value 1')
      fireEvent.click(clickElement)
      expect(container.firstChild).toMatchSnapshot()
    })
  })

  describe('Before the select is clicked', () => {
    it('Does not display the list of values', () => {
      render(<Select options={numberRange} onChange={() => true} />)

      const listItems = screen.queryByRole('listitem')
      expect(listItems).toBeNull()
    })
  })

  describe('When the select is clicked', () => {
    it('Displays the list of values', () => {
      render(<Select options={numberRange} onChange={() => true} />)

      const clickElement = screen.getByText('value 1')
      userEvent.click(clickElement)

      const itemList = screen.getAllByRole('listitem')
      expect(itemList).toHaveLength(numberRange.length)
    })
  })

  describe('When the value is changed', () => {
    it("Passes the selected value to the parent's callback", () => {
      const onChangeSpy = jest.fn()
      render(<Select options={numberRange} onChange={onChangeSpy} />)

      const clickElement = screen.getByText('value 1')
      userEvent.click(clickElement)

      const listItem = screen.getByText('value 3')
      userEvent.click(listItem)

      expect(onChangeSpy).toHaveBeenCalledWith(numberRange[2])
    })
  })

  describe('The keyboard interactions', () => {
    describe('When the select is closed', () => {
      it('Gets into focus when the user presses tab', () => {
        render(<Select options={numberRange} onChange={() => true} />)
        const clickElement = screen.getByText('value 1')

        spyOn(clickElement, 'focus')

        userEvent.tab()

        expect(clickElement.focus).toHaveBeenCalled()
      })
      it('Opens the options when the user presses enter', () => {
        render(<Select options={numberRange} onChange={() => true} />)
        const clickElement = screen.getByText('value 1')
        fireEvent.keyUp(clickElement, {
          code: 'Enter',
          key: 'Enter',
        })
        const itemList = screen.getAllByRole('listitem')
        expect(itemList).toHaveLength(numberRange.length)
      })
      it('Opens the options when the user presses space', () => {
        render(<Select options={numberRange} onChange={() => true} />)
        const clickElement = screen.getByText('value 1')
        fireEvent.keyUp(clickElement, {
          code: 'Space',
          key: ' ',
        })
        const itemList = screen.getAllByRole('listitem')
        expect(itemList).toHaveLength(numberRange.length)
      })

      it('Opens the options when the user presses arrow down', () => {
        render(<Select options={numberRange} onChange={() => true} />)
        const clickElement = screen.getByText('value 1')
        fireEvent.keyUp(clickElement, {
          code: 'ArrowDown',
          key: 'ArrowDown',
        })
        const itemList = screen.getAllByRole('listitem')
        expect(itemList).toHaveLength(numberRange.length)
      })
    })

    describe('When the select is open and the list of options is visible', () => {
      it('is navigable with the tab key', () => {
        render(<Select options={numberRange} onChange={() => true} />)
        const clickElement = screen.getByText('value 1')
        fireEvent.keyUp(clickElement, {
          code: 'Enter',
          key: 'Enter',
        })
        const secondItem = screen.getByText('value 2')
        spyOn(secondItem, 'focus')

        expect(secondItem.focus).not.toHaveBeenCalled()
        userEvent.tab()
        expect(secondItem.focus).toHaveBeenCalled()
      })

      it('is navigable with the arrow keys', () => {
        render(<Select options={numberRange} onChange={() => true} />)
        const clickElement = screen.getByText('value 1')
        fireEvent.keyUp(clickElement, {
          code: 'Enter',
          key: 'Enter',
        })
        const secondItem = screen.getByText('value 2')
        spyOn(secondItem, 'focus')

        const thirdItem = screen.getByText('value 3')
        spyOn(thirdItem, 'focus')

        expect(secondItem.focus).not.toHaveBeenCalled()

        fireEvent.keyUp(secondItem, {
          code: 'ArrowDown',
          key: 'ArrowDown',
        })
        expect(secondItem.focus).toHaveBeenCalledTimes(1)

        fireEvent.keyUp(secondItem, {
          code: 'ArrowDown',
          key: 'ArrowDown',
        })
        expect(thirdItem.focus).toHaveBeenCalledTimes(1)

        fireEvent.keyUp(secondItem, {
          code: 'ArrowUp',
          key: 'ArrowUp',
        })
        expect(secondItem.focus).toHaveBeenCalledTimes(2)
      })

      it('is selectable with the enter key', () => {
        const changeSpy = jest.fn()
        render(<Select options={numberRange} onChange={changeSpy} />)
        const clickElement = screen.getByText('value 1')
        fireEvent.keyUp(clickElement, {
          code: 'Enter',
          key: 'Enter',
        })
        const secondItem = screen.getByText('value 2')
        fireEvent.keyUp(secondItem, {
          code: 'Enter',
          key: 'Enter',
        })
        expect(changeSpy).toHaveBeenCalledWith(numberRange[1])
      })
    })
  })
})
