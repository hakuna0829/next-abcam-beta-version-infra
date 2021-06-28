const classname = 'checkoutordersummary--primary'
const url = `?path=/story/${classname}`

beforeEach(() => {
  cy.visit(url)
  cy.wait(3000)
  cy.get(`#${classname}`)
  cy.visit(url + '&nav=0')
})

describe('CheckoutOrderSummary Example visual regression', () => {
  it('Matches the snapshot for Checkout Order Summary - Desktop', () => {
    cy.viewport(1280, 1024)
    cy.wait(3000)
    cy.get('#storybook-preview-wrapper').matchImageSnapshot(
      'CheckoutOrderSummary-Desktop'
    )
  })

  it('Matches the snapshot for Checkout Order Summary - Tablet', () => {
    cy.viewport(768, 640)
    cy.wait(3000)
    cy.get('#storybook-preview-wrapper').matchImageSnapshot(
      'CheckoutOrderSummary-Tablet'
    )
  })

  it('Matches the snapshot for Checkout Order Summary - Mobile', () => {
    cy.viewport(475, 667)
    cy.wait(3000)
    cy.get('#storybook-preview-wrapper').matchImageSnapshot(
      'CheckoutOrderSummary-Mobile'
    )
  })
})
