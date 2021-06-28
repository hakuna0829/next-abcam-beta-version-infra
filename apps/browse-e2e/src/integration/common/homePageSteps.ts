/// <reference types="cypress" />
import { Given, Then, When, And } from 'cypress-cucumber-preprocessor/steps'
import { handleException } from '../../lib/helpers'
import HomePage from '../../integration/pageObjects/HomePage'
import { getSearchSuggestions } from '../../lib/routes'

Given(`I am on the YETI homepage`, () => {
  cy.visit('/')
})

Then(`I should see the abcam header`, () => {
  cy.get(HomePage.logo).should('be.visible')
})

When(`I click on the about svg`, () => {
  cy.get(HomePage.aboutSvgId).click({ force: true })
})

Then(`I should see the home page`, () => {
  cy.get(HomePage.searchBarId).should('be.visible')
  cy.get(HomePage.searchBarMessageId).should('be.visible')
})

Given(`I should not see the {string}`, (arg0) => {
  cy.get(HomePage.searchBarMessageId).should('not.be.visible')
})

Given(`I should see the {string}`, (arg0) => {
  cy.get(HomePage.searchBarInputTextId).should('be.visible')
})

And('I search for {string}', function (item: string) {
  handleException()
  cy.get(HomePage.searchBarId).should('be.visible').type(item)
  getSearchSuggestions(item).then((response) => {
    expect(response.body.suggestions).to.not.have.length(0)
    response.body.suggestions.forEach((suggestion: { label: any }) => {
      cy.get(HomePage.searchLozenge).should('contain.text', suggestion.label)
    })
  })
})

When('I select the {string} option', function (arg0) {
  cy.get(HomePage.resultSelectList, { timeout: 10000 }).should('be.visible')
  cy.contains(HomePage.resultSelectList, arg0).click()
})

When('I select {string} from search lozenges', function (searchTerm) {
  if (Cypress.env('deviceType') === 'mobile')
    cy.get(HomePage.showButton).click()
  cy.contains(searchTerm).should('be.visible').click()
})
