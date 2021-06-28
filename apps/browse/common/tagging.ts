type Tag =
  | 'immunogen-description'
  | 'iso-type'
  | 'host-taxa'
  | 'all-tag'
  | 'product-code'
  | 'overview-tab'
  | 'datasheet-tab'
  | 'support-tab'
  | 'download-button'
  | 'summary-name'
  | 'contact-distributor-button'
  | 'alternative-names'
  | 'short-description'
  | 'publications-view-all'
  | 'images-count'
  | 'page-name'
  | 'antibody-column'
  | 'notes-column'
  | 'download'
  | 'protocols-title'
  | 'protocols-description'
  | 'how-to-store-title'
  | 'search-button'
  | 'footer-wrapper'
  | 'products-number'
  | 'categories-number'
  | 'search-input'
  | 'accordion-label'
  | 'label-count'
  | 'welcome-abcam-title'
  | 'go-back-button'
  | 'feedback-button'
  | 'welcome-description'
  | 'close-toggle-button'
  | 'open-toggle-button'
  | 'previous-searches'
  | 'abcam-logo'
  | 'show-button'
  | 'native-search-input'
  | 'suggestions-title'
  | 'suggestion-item'
  | 'search-hint'
  | 'slider-image'
  | 'image-info-title'
  | 'back-button'
  | 'quickview'
  | 'publications'
  | 'search-title'

type TestTagProp = {
  'data-cy': string
}

function testTagProp(tag: Tag): TestTagProp {
  return {
    'data-cy': tag,
  }
}

export { testTagProp }
export type { Tag }
