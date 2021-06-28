const classname = 'checkoutordersummaryfooter--primary'
const url = `?path=/story/${classname}`

beforeEach(() => {
  cy.visit(url)
  cy.wait(3000)
  cy.get(`#${classname}`)
  cy.visit(url + '&nav=0')
})

describe('CheckoutOrderSummaryFooter Example visual regression', () => {
  it('Matches the snapshot for Checkout Order Footer - Desktop', () => {
    cy.viewport(1280, 1024)
    cy.wait(3000)
    cy.get('#storybook-preview-wrapper').matchImageSnapshot(
      'CheckoutOrderSummaryFooter-Desktop'
    )
  })

  it('Matches the snapshot for Checkout Order Footer - Tablet', () => {
    cy.viewport(768, 640)
    cy.wait(3000)
    cy.get('#storybook-preview-wrapper').matchImageSnapshot(
      'CheckoutOrderSummaryFooter-Tablet'
    )
  })

  it('Matches the snapshot for Checkout Order Footer - Mobile', () => {
    cy.viewport(475, 667)
    cy.wait(3000)
    cy.get('#storybook-preview-wrapper').matchImageSnapshot(
      'CheckoutOrderSummaryFooter-Mobile'
    )
  })
})
