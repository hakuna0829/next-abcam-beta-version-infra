const classname = 'buybox--buy-box-example-with-fetch'
const url = `?path=/story/${classname}`

describe('BuyBox Example visual regression', () => {
  it('Matches the snapshot', () => {
    cy.visit(url)
    cy.viewport(1000, 1500)
    cy.get(`#${classname}`)
    cy.get('body').type('S')
    cy.get('body').type('A')
    cy.wait(3000)
    cy.get('#storybook-preview-wrapper').matchImageSnapshot(
      'buyboxDesktopExample'
    )
    cy.viewport(375, 667)
    cy.get(`#${classname}`)
    cy.get('body').type('S')
    cy.get('body').type('A')
    cy.wait(5000)
    cy.get('#storybook-preview-wrapper').matchImageSnapshot(
      'buyboxMobileExample'
    )
  })
})
