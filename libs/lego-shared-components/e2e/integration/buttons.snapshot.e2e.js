const classname = 'components-button-overview--as-button'
const url = `?path=/story/${classname}`

describe('Buttons visual regression', () => {
  it('Matches the snapshot', () => {
    cy.visit(url)
    cy.viewport(1000, 2500)
    cy.get(`#${classname}`)
    cy.get('body').type('S').type('A')
    cy.get('body').matchImageSnapshot('buttons')
  })
})
