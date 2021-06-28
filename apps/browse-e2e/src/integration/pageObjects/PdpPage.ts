/// <reference types="cypress" />

export class PdpPage {
  get productDescription() {
    return cy.get('[data-cy="product-description"]')
  }
  get closeButton() {
    return cy.get('[data-cy="close-button"]').first()
  }
  get gridElement() {
    return cy.get('.aem-Grid:visible').first()
  }
  get sliderImages() {
    return cy.get('[data-cy="slider-image"]')
  }
  get downloadButton() {
    return cy.get('[data-cy="download-button"]').first()
  }
  get immunogen() {
    return cy.get('[data-cy=notes-column]')
  }
  get conjugation() {
    return cy.get('[data-cy="conjugation"]')
  }

  open(productId: string) {
    cy.visit(`/en-gb/product/${productId}/datasheet`)
  }

  assertProduct(productId: string) {
    cy.url().should('include', productId)
  }

  waitForPdpPageLoad() {
    this.productDescription.should('be.visible')
  }

  close() {
    this.closeButton.click()
  }

  expectGridIsVisible() {
    this.gridElement.should('be.visible')
  }

  selectApplicationTab(application: string) {
    this.getApplicationTabByName(application)
      .should('be.visible')
      .scrollIntoView()
      .click({ force: true })
  }

  getApplicationTabByName(application: string) {
    return cy.get(`.aem-Grid [data-cy="${application}-tab"]`)
  }

  expectNewImages() {
    this.sliderImages.first().should('be.visible').scrollIntoView()
  }

  selectSectionTab(column: string) {
    this.getSectionTabByName(column)
      .should('be.visible')
      .scrollIntoView()
      .click({ force: true })
  }

  getSectionTabByName(column: string) {
    return cy.get(`[data-cy="${column}-tab"]`)
  }

  expectDownloadButtonIsVisible() {
    this.downloadButton.should('be.visible')
  }

  expectSectionTabIsVisible(section: string) {
    this.getSectionTabByName(section).should('be.visible')
  }

  expectProductDatasheetFieldValue(field: string, value: string) {
    switch (field) {
      case 'IMMUNOGEN':
        this.immunogen.should('contain', value)
        break

      case 'CONJUGATION':
        this.conjugation.should('contain', value)
        break
    }
  }
}

export default new PdpPage()
