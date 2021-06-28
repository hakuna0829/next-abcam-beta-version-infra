const SrpPage = {
  closeButtonIdPlp: '[data-cy=close-button]',
  distributorButton: '[data-cy=contact-distributor-button]',
  dropDown: '[data-cy=drop-down]',
  filter: 'span.f1c854tw:nth-child(5) > svg:nth-child(1)',
  filterRow: '[data-cy=filter-row-]',
  fullProductButton: '[data-cy=full-product-button]',
  giveFeedbackButtonId: '[data-cy=feedback-button]',
  goBackToOldSite: '[data-cy=go-back-button]',
  noAntibodiesFound: '[data-cy=search-title]',
  productName: '[data-cy=product-name]',
  relevanceButton: '[data-cy=relevance-button]',
  searchLozengePlp: '[data-cy=search-lozenge]',
  searchBarId: '[data-cy=native-search-input]',
  searchResults: '[data-cy=product-grid-row]',
  welcomeMessage: '[data-cy=welcome-description]',

  visit(targetPage: string) {
    if (targetPage) {
      cy.visit(
        `/search?facets.categoryType=Primary%20Antibodies&facets.target=${encodeURIComponent(
          targetPage
        )}&sorting=relevance`
      )
    } else {
      cy.visit('/search')
    }
  },
}
export default SrpPage
