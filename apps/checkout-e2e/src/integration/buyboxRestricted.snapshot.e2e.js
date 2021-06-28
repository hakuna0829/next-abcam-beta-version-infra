const classname = 'buybox--buy-box-restricted'
const url = `?path=/story/${classname}`

describe('BuyBox Restricted visual regression', () => {
  it('Matches the snapshot', () => {
    cy.visit(url)
    cy.viewport(1000, 1600)
    cy.get(`#${classname}`)
    cy.get('body').type('S')
    cy.get('body').type('A')
    cy.get('#storybook-preview-wrapper').matchImageSnapshot(
      'buyBoxDesktopRestricted'
    )
    cy.viewport(375, 667)
    cy.get(`#${classname}`)
    cy.get('body').type('S')
    cy.get('body').type('A')
    cy.wait(1000)
    cy.get('#storybook-preview-wrapper').matchImageSnapshot(
      'buyBoxMobileRestricted'
    )
  })
})
