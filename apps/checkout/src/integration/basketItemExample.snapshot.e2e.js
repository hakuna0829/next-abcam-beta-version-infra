const classname = 'basketitemlist--primary'
const url = `?path=/story/${classname}`

beforeEach(() => {
  cy.visit(url)
  cy.wait(3000)
  cy.get(`#${classname}`)
  cy.visit(url + '&nav=0')
})

describe('BasketList Example visual regression', () => {
  it('Matches the snapshot for Basket Item - Desktop', () => {
    cy.viewport(1280, 1024)
    cy.wait(3000)
    cy.get('#storybook-preview-wrapper').matchImageSnapshot(
      'basketListDesktopExample'
    )
  })

  it('Matches the snapshot Basket Item - Tablet', () => {
    cy.viewport(768, 640)
    cy.wait(3000)
    cy.get('#storybook-preview-wrapper').matchImageSnapshot(
      'basketListTabletExample'
    )
  })

  it('Matches the snapshot Basket Item - Mobile', () => {
    cy.viewport(475, 667)
    cy.wait(3000)
    cy.get('#storybook-preview-wrapper').matchImageSnapshot(
      'basketListMobileExample'
    )
  })
})
