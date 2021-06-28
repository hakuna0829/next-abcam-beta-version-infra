const classname = 'basketitemlist--primary'
const url = `?path=/story/${classname}`

describe('BasketList Example visual regression', () => {
  it('Matches the snapshot', () => {
    cy.visit(url)
    //desktop
    cy.viewport(1280, 1024)
    cy.get(`#${classname}`)
    cy.get('body').type('S')
    cy.get('body').type('A')
    cy.wait(3000)
    cy.get('body').matchImageSnapshot('basketListDesktopExample')

    //tablet
    cy.viewport(768, 640)
    cy.wait(3000)
    cy.get('body').matchImageSnapshot('basketListTabletExample')

    //mobile
    cy.viewport(475, 667)
    cy.wait(5000)
    cy.get('body').matchImageSnapshot('basketListMobileExample')
  })
})
