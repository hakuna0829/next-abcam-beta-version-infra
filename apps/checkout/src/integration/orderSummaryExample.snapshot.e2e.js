const classname = 'ordersummary--primary'
const url = `?path=/story/${classname}`

beforeEach(() => {
  cy.visit(url)
  cy.wait(3000)
  cy.get(`#${classname}`)
  cy.visit(url + '&nav=0')
})

describe('OrderSummary Example visual regression', () => {
  it('Matches the snapshot for Order Summary - Desktop', () => {
    cy.viewport(1280, 1024)
    cy.wait(3000)
    cy.get('#storybook-preview-wrapper').matchImageSnapshot(
      'OrderSummary-Desktop'
    )
  })

  it('Matches the snapshot for Order Summary - Tablet', () => {
    cy.viewport(768, 640)
    cy.wait(3000)
    cy.get('#storybook-preview-wrapper').matchImageSnapshot(
      'OrderSummary-Tablet'
    )
  })

  it('Matches the snapshot for Order Summary - Mobile', () => {
    cy.viewport(475, 667)
    cy.wait(3000)
    cy.get('#storybook-preview-wrapper').matchImageSnapshot(
      'OrderSummary-Mobile'
    )
  })
})
