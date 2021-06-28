const classname = 'styleguide-boxshadow--index'
const url = `?path=/story/${classname}`

describe('Shadow visual regression', () => {
  it('Matches the snapshot', () => {
    cy.viewport(1000, 1500)
    cy.visit(url)
    cy.get(`#${classname}`)
    cy.get('body').type('S')
    cy.get('body').type('A')
    cy.matchImageSnapshot('shadows')
  })
})
