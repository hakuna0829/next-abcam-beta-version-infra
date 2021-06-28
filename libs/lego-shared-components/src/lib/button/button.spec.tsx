import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import { ButtonProps } from './button.type'
import { Button } from '@abcam-web/lego-shared-components/lib'
import { Picture } from '@abcam-web/lego-shared-components/icons'

jest.mock('next/router', () => ({ useRouter: jest.fn() }))

describe('The button', () => {
  describe('As a button', () => {
    it('Triggers the click callback on click', () => {
      const spy = jest.fn()
      render(
        <Button variant={'primary'} onClick={spy}>
          Hello
        </Button>
      )
      fireEvent.click(screen.getByText('Hello'))
      expect(spy.mock.calls.length).toBe(1)
    })

    it('Does not trigger the click callback if the disabled prop is passed', () => {
      const spy = jest.fn()
      render(
        <Button variant={'primary'} onClick={spy} disabled={true}>
          Hello
        </Button>
      )
      fireEvent.click(screen.getByText('Hello'))
      expect(spy.mock.calls.length).toBe(0)
    })
  })

  describe('As a link', () => {
    it('Handles internal links', () => {
      const pushMock = jest.fn()
      ;(useRouter as any).mockImplementation(() => {
        return {
          push: pushMock,
        }
      })
      const fakeHref = 'http://www.fake.com'
      render(
        <Button variant={'primary'} as={'a'} href={fakeHref}>
          Hello
        </Button>
      )
      fireEvent.click(screen.getByText('Hello'))
      expect(pushMock).toHaveBeenCalledTimes(1)
      fireEvent.click(screen.getByText('Hello'))
      expect(pushMock).toHaveBeenCalledTimes(2)
    })

    it('Handles external links', () => {
      const pushMock = jest.fn()
      ;(useRouter as any).mockImplementation(() => {
        return {
          push: pushMock,
        }
      })
      const fakeHref = 'http://www.fake.com'
      render(
        <Button variant={'primary'} as={'a'} href={fakeHref} openInNewWindow>
          Hello
        </Button>
      )
      fireEvent.click(screen.getByText('Hello'))
      expect(pushMock).not.toHaveBeenCalled()
    })
  })
  describe('Snapshots', () => {
    describe('Styles variant', () => {
      it('Accepts any combination of size and variant', () => {
        const sizes: ButtonProps['size'][] = ['small', 'medium', 'large']
        const variants: ButtonProps['variant'][] = [
          'primary',
          'secondary',
          'tertiary',
          'quaternary',
        ]

        sizes.forEach((size) => {
          variants.forEach((variant) => {
            const { container } = render(
              <Button variant={variant} size={size}>
                Hello
              </Button>
            )
            expect(container.firstChild).toMatchSnapshot()
          })
        })
      })
    })
    describe('As a button', () => {
      it('Matches snapshot', () => {
        const spy = jest.fn()
        const { container } = render(
          <Button variant={'primary'} as={'button'} onClick={spy}>
            Hello
          </Button>
        )
        expect(container.firstChild).toMatchSnapshot()
      })

      it('Accepts a left icon', () => {
        const spy = jest.fn()
        const { container } = render(
          <Button
            variant={'primary'}
            as={'button'}
            onClick={spy}
            iconLeft={<Picture />}
          >
            Hello
          </Button>
        )
        expect(container.firstChild).toMatchSnapshot()
      })

      it('Accepts a right icon', () => {
        const spy = jest.fn()
        const { container } = render(
          <Button
            variant={'primary'}
            as={'button'}
            onClick={spy}
            iconRight={<Picture />}
          >
            Hello
          </Button>
        )
        expect(container.firstChild).toMatchSnapshot()
      })

      it('Accepts a left and right icon', () => {
        const spy = jest.fn()
        const { container } = render(
          <Button
            variant={'primary'}
            as={'button'}
            onClick={spy}
            iconRight={<Picture />}
            iconLeft={<Picture />}
          >
            Hello
          </Button>
        )
        expect(container.firstChild).toMatchSnapshot()
      })

      it('Shows a iconButton', () => {
        const spy = jest.fn()
        const { container } = render(
          <Button variant={'primary'} as={'button'} onClick={spy} iconButton>
            <Picture />
          </Button>
        )
        expect(container.firstChild).toMatchSnapshot()
      })

      it('Accepts external classes', () => {
        const spy = jest.fn()
        const fakeClass = 'myFakeClass'
        const { container } = render(
          <Button
            variant={'primary'}
            as={'button'}
            onClick={spy}
            className={fakeClass}
          >
            Hello
          </Button>
        )
        expect(container.firstChild).toMatchSnapshot()
      })
    })

    describe('As a link', () => {
      it('Matches snapshot', () => {
        const { container } = render(
          <Button variant={'primary'} as={'a'}>
            Hello
          </Button>
        )
        expect(container.firstChild).toMatchSnapshot()
      })

      it('Accepts a left icon', () => {
        const spy = jest.fn()
        const { container } = render(
          <Button
            variant={'primary'}
            as={'a'}
            onClick={spy}
            iconLeft={<Picture />}
          >
            Hello
          </Button>
        )
        expect(container.firstChild).toMatchSnapshot()
      })

      it('Accepts a right icon', () => {
        const spy = jest.fn()
        const { container } = render(
          <Button
            variant={'primary'}
            as={'a'}
            onClick={spy}
            iconRight={<Picture />}
          >
            Hello
          </Button>
        )
        expect(container.firstChild).toMatchSnapshot()
      })

      it('Accepts a left and right icon', () => {
        const spy = jest.fn()
        const { container } = render(
          <Button
            variant={'primary'}
            as={'a'}
            onClick={spy}
            iconRight={<Picture />}
            iconLeft={<Picture />}
          >
            Hello
          </Button>
        )
        expect(container.firstChild).toMatchSnapshot()
      })

      it('Shows a iconButton', () => {
        const spy = jest.fn()
        const { container } = render(
          <Button variant={'primary'} as={'a'} onClick={spy} iconButton>
            <Picture />
          </Button>
        )
        expect(container.firstChild).toMatchSnapshot()
      })

      it('Accepts external classes', () => {
        const spy = jest.fn()
        const fakeClass = 'myFakeClass'
        const { container } = render(
          <Button variant={'primary'} as={'a'} className={fakeClass}>
            Hello
          </Button>
        )
        expect(container.firstChild).toMatchSnapshot()
      })
    })
  })
})
