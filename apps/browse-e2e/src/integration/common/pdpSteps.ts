/// <reference types="cypress" />
import { Given, And, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { constants } from '../common-files/constants'
import HomePage from '../pageObjects/HomePage'
import PdpPage from '../pageObjects/PdpPage'

Then(`I should see PDP page`, () => {
  PdpPage.waitForPdpPageLoad()
})

When(`I click on the back to search button`, () => {
  PdpPage.close()
})

And(`I click on show results button`, () => {
  cy.get(HomePage.showButton, { timeout: 10000 }).should('be.visible').click()
})

Given('I am on the PDP page for {string}', (product: string) => {
  PdpPage.open(product)
})

Given(`I should see product name {string} in url`, (productId: string) => {
  PdpPage.assertProduct(productId)
})

When('I assert on product details:', (map: any) => {
  map.rawTable.forEach((row: any) => {
    PdpPage.expectProductDatasheetFieldValue(row[0].toUpperCase(), row[1])
  })
})

And('the applications grid is visible', () => {
  PdpPage.expectGridIsVisible()
})

When('I select an application {string} filter', (application: string) => {
  PdpPage.selectApplicationTab(application)
})

When(`I select {string} section`, (section: string) => {
  PdpPage.selectSectionTab(section)
})

Then('I should see {string} section', (section: string) => {
  PdpPage.expectSectionTabIsVisible(section)
})

Then('I should see Download Datasheet section', () => {
  PdpPage.expectDownloadButtonIsVisible()
})

Then(`I should see new images`, () => {
  PdpPage.expectNewImages()
})
