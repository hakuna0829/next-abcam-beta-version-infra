import React from 'react'
import { render, screen, userEvent, act } from '@browse/test-utils'

import { ContactDistributor } from './contact-distributor'
import { ContactDistributorPropTypes } from './contact-distributor.types'

const props: ContactDistributorPropTypes = {
  summary: {
    name: 'sum-name',
    productCode: '123',
    shortDescription: '',
    type: '',
    url: '',
  },
  sizes: [{ volumeOrMass: '2', uom: 'kg' }],
}

describe('ContactDistributor', () => {
  it('should display the given sizes', () => {
    render(<ContactDistributor {...props} />)
    expect(screen.getByText('2 kg')).toBeInTheDocument()
  })

  it('should not display a dialog', () => {
    render(
      <>
        <div id="modal"></div>
        <ContactDistributor {...(props as any)} />
      </>
    )

    // .not.toBeVisible() results in a false positive here.
    expect(screen.getByRole('dialog')).not.toHaveClass('modalShow')
  })

  it('should display a dialog when clicking on contact distributor button', () => {
    render(
      <>
        <div id="modal"></div>
        <ContactDistributor {...(props as any)} />
      </>
    )

    userEvent.click(
      screen.getByRole('button', { name: /contact distributor/i })
    )

    expect(screen.getByRole('dialog')).toHaveClass('modalShow')
  })

  it('should display a dialog when clicking on buy button', () => {
    render(
      <>
        <div id="modal"></div>
        <ContactDistributor {...(props as any)} />
      </>
    )

    userEvent.click(screen.getByRole('button', { name: /buy/i }))

    expect(screen.getByRole('dialog')).toHaveClass('modalShow')
  })
})
