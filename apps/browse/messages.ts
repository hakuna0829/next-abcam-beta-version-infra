import { defineMessages } from 'react-intl'

type MessagesType = { [key: string]: { id: string; defaultMessage: string } }

export default defineMessages({
  headerAbout: {
    id: 'yeti.header.about',
    defaultMessage: 'About',
  },
  footerCopyright: {
    id: 'yeti.footer.copyright',
    defaultMessage: '© Abcam 2021',
  },
  footerContact: {
    id: 'yeti.footer.contact',
    defaultMessage: 'Contact',
  },
  footerPrivacy: {
    id: 'yeti.footer.privacy',
    defaultMessage: 'Privacy',
  },
  footerTermsAndConditions: {
    id: 'yeti.footer.termsAndConditions',
    defaultMessage: 'Terms & conditions',
  },
  productHome: {
    id: 'yeti.product.home',
    defaultMessage: 'Home',
  },
  productBuy: {
    id: 'yeti.product.buy',
    defaultMessage: 'Buy',
  },
  productMakeInquiry: {
    id: 'yeti.product.makeInquiry',
    defaultMessage: 'Make an inquiry',
  },
  productIsotype: {
    id: 'yeti.product.isotype',
    defaultMessage: 'Isotype',
  },
  productHostSpecies: {
    id: 'yeti.product.hostSpecies',
    defaultMessage: 'Host species',
  },
  productFormulation: {
    id: 'yeti.product.formulation',
    defaultMessage: 'Formulation',
  },
  productConjugation: {
    id: 'yeti.product.conjugation',
    defaultMessage: 'Conjugation',
  },
  productImmunogen: {
    id: 'yeti.product.immunogen',
    defaultMessage: 'Immunogen',
  },
  productDatabaseLink: {
    id: 'yeti.product.databaseLink',
    defaultMessage: 'Database link',
  },
  productOurBrands: {
    id: 'yeti.product.ourBrands',
    defaultMessage: 'Our brands',
  },
  productContactDistributor: {
    id: 'yeti.product.contactDistributor',
    defaultMessage: 'Contact distributor',
  },
  productOrderNotice: {
    id: 'yeti.product.orderNotice',
    defaultMessage:
      'If you want to place an order, please contact our distributor',
  },
  productBackToSearch: {
    id: 'yeti.product.backToSearch',
    defaultMessage: 'Back to search',
  },
  productOverview: {
    id: 'yeti.product.overview',
    defaultMessage: 'Overview',
  },
  productDatasheet: {
    id: 'yeti.product.datasheet',
    defaultMessage: 'Datasheet',
  },
  productSupportAndDownloads: {
    id: 'yeti.product.supportAndDownloads',
    defaultMessage: 'Support & downloads',
  },
  productValidatedApplications: {
    id: 'yeti.product.reactivityApplications',
    defaultMessage: 'Validated applications',
  },
  productValidatedApplicationsAll: {
    id: 'yeti.product.reactivityApplications.all',
    defaultMessage: 'All',
  },
  productDatasheetAntibody: {
    id: 'yeti.product.datasheet.antibody',
    defaultMessage: 'Antibody',
  },
  productDatasheetDescription: {
    id: 'yeti.product.datasheet.description',
    defaultMessage: 'Description',
  },
  productDatasheetPositiveControl: {
    id: 'yeti.product.datasheet.positiveControl',
    defaultMessage: 'Positive control',
  },
  productDatasheetIsotype: {
    id: 'yeti.product.datasheet.isotype',
    defaultMessage: 'Isotype',
  },
  productDatasheetHostSpecies: {
    id: 'yeti.product.datasheet.hostSpecies',
    defaultMessage: 'Host species',
  },
  productDatasheetClonality: {
    id: 'yeti.product.datasheet.clonality',
    defaultMessage: 'Clonality',
  },
  productDatasheetConjugation: {
    id: 'yeti.product.datasheet.conjugation',
    defaultMessage: 'Conjugation',
  },
  productDatasheetCloneNumber: {
    id: 'yeti.product.datasheet.cloneNumber',
    defaultMessage: 'Clone number',
  },
  productDatasheetImmunogen: {
    id: 'yeti.product.datasheet.immunogen',
    defaultMessage: 'Immunogen',
  },
  productDatasheetStorage: {
    id: 'yeti.product.datasheet.storage',
    defaultMessage: 'Storage',
  },
  productDatasheetForm: {
    id: 'yeti.product.datasheet.form',
    defaultMessage: 'Form',
  },
  productDatasheetStorageBuffer: {
    id: 'yeti.product.datasheet.storageBuffer',
    defaultMessage: 'Storage bugger',
  },
  productDatasheetPurity: {
    id: 'yeti.product.datasheet.purity',
    defaultMessage: 'Purity',
  },
  productDatasheetPurificationNotes: {
    id: 'yeti.product.datasheet.purificationNotes',
    defaultMessage: 'Purification notes',
  },
  productDatasheetStorageInstructions: {
    id: 'yeti.product.datasheet.storageInstructions',
    defaultMessage: 'Storage instructions',
  },
  productDatasheetNotes: {
    id: 'yeti.product.datasheet.notes',
    defaultMessage: 'Notes',
  },
  productSupportAndDownloadsPrints: {
    id: 'yeti.product.supportAndDownloads.prints',
    defaultMessage: 'Prints',
  },
  productSupportAndDownloadsDatasheet: {
    id: 'yeti.product.supportAndDownloads.datasheet',
    defaultMessage: 'Print Datasheet',
  },
  productSupportAndDownloadsProtocols: {
    id: 'yeti.product.supportAndDownloads.protocols',
    defaultMessage: 'Protocols',
  },
  productSupportAndDownloadsProtocolsNotRequired: {
    id: 'yeti.product.supportAndDownloads.protocolsNotRequired',
    defaultMessage:
      'To our knowledge, no specific protocols are required for this product. Check the ',
  },
  productSupportAndDownloadsGeneralProtocols: {
    id: 'yeti.product.supportAndDownloads.generalProtocols',
    defaultMessage: 'general protocols:',
  },
  productSupportAndDownloadsHowToStore: {
    id: 'yeti.product.supportAndDownloads.howToStore',
    defaultMessage: 'How to store',
  },
  productSupportAndDownloadsGetHelpWithProduct: {
    id: 'yeti.product.supportAndDownloads.getHelpWithProduct',
    defaultMessage: 'Get help with this product',
  },
  productSupportAndDownloadsSearchSupportHub: {
    id: 'yeti.product.supportAndDownloads.searchSupportHub',
    defaultMessage: 'Search support hub',
  },
  entityAllProducts: {
    id: 'yeti.entity.allProducts',
    defaultMessage: 'All {entityName} products',
  },
  entityFoundProductsInCategories: {
    id: 'yeti.entity.foundProductsInCategories',
    defaultMessage:
      'We found {productsCount} products in {categoriesCount} categories',
  },
  searchResultsQuickView: {
    id: 'yeti.searchResults.quickView',
    defaultMessage: 'Quick view',
  },
  searchResultsPublications: {
    id: 'yeti.searchResults.publications',
    defaultMessage: 'Publications',
  },
  searchResultsMobileViewPublications: {
    id: 'yeti.searchResults.mobileViewPublications',
    defaultMessage: 'publications',
  },
  searchResultsMobileViewImages: {
    id: 'yeti.searchResults.mobileViewImages',
    defaultMessage: 'images',
  },
  searchResultsFilters: {
    id: 'yeti.searchResults.filters',
    defaultMessage: 'Filters',
  },
  searchResultsImages: {
    id: 'yeti.searchResults.images',
    defaultMessage: 'Images',
  },
  searchResultsApplications: {
    id: 'yeti.searchResults.applications',
    defaultMessage: 'Applications',
  },
  searchResultsConjugation: {
    id: 'yeti.searchResults.conjugation',
    defaultMessage: 'Conjugation',
  },
  searchResultsSpecies: {
    id: 'yeti.searchResults.species',
    defaultMessage: 'Reactive taxa',
  },
  searchResultsAllFilters: {
    id: 'yeti.searchResults.allFilters',
    defaultMessage: 'All filters',
  },
  searchResultsClearAll: {
    id: 'yeti.searchResults.clearAll',
    defaultMessage: 'Clear all',
  },
  searchResultsBack: {
    id: 'yeti.searchResults.back',
    defaultMessage: 'Back',
  },
  searchResultsFound: {
    id: 'yeti.searchResults.found',
    defaultMessage: '{productCount} {productName} found',
  },
  searchPlaceholder: {
    id: 'yeti.search.placeholder',
    defaultMessage: 'What are you looking for?',
  },
  searchSuggestions: {
    id: 'yeti.search.suggestions',
    defaultMessage: 'Suggestions',
  },
  searchNoSuggestions: {
    id: 'yeti.search.noSuggestions',
    defaultMessage: 'No suggestions',
  },
  searchDidYouMean: {
    id: 'yeti.search.didYouMean',
    defaultMessage: 'Did you mean?',
  },
  searchHint: {
    id: 'yeti.search.hint',
    defaultMessage: 'Search for targets, applications, species',
  },
  searchShowResults: {
    id: 'yeti.search.showResults',
    defaultMessage: 'Show {count} results',
  },
  searchPreviousSearches: {
    id: 'yeti.previousSearches.title',
    defaultMessage: 'Previous searches',
  },
})

export const sortingMessages: MessagesType = defineMessages({
  relevance: {
    id: 'yeti.searchResults.sort.relevance',
    defaultMessage: 'Relevance',
  },
  publications: {
    id: 'yeti.searchResults.sort.publications',
    defaultMessage: 'Publications',
  },
  recency: {
    id: 'yeti.searchResults.sort.recency',
    defaultMessage: 'Recency',
  },
})

export const facetMessages: MessagesType = defineMessages({
  application: {
    id: 'yeti.facet.application',
    defaultMessage: 'Application',
  },
  assayDuration: {
    id: 'yeti.facet.assayDuration',
    defaultMessage: 'Assay duration',
  },
  assayType: {
    id: 'yeti.facet.assayType',
    defaultMessage: 'Assay type',
  },
  biologicalAction: {
    id: 'yeti.facet.biologicalAction',
    defaultMessage: 'Biological action',
  },
  biologicalActivity: {
    id: 'yeti.facet.biologicalActivity',
    defaultMessage: 'Biological activity',
  },
  brand: {
    id: 'yeti.facet.brand',
    defaultMessage: 'Brand',
  },
  carrierFree: {
    id: 'yeti.facet.carrierFree',
    defaultMessage: 'Carrier free',
  },
  chemicalType: {
    id: 'yeti.facet.chemicalType',
    defaultMessage: 'Chemical type',
  },
  classification: {
    id: 'yeti.facet.classification',
    defaultMessage: 'Classification',
  },
  clonality: {
    id: 'yeti.facet.clonality',
    defaultMessage: 'Clonality',
  },
  conjugation: {
    id: 'yeti.facet.conjugation',
    defaultMessage: 'Conjugation',
  },
  detectionMethod: {
    id: 'yeti.facet.detectionMethod',
    defaultMessage: 'Detection method',
  },
  expressionSystem: {
    id: 'yeti.facet.expressionSystem',
    defaultMessage: 'Expression system',
  },
  format: {
    id: 'yeti.facet.format',
    defaultMessage: 'Format',
  },
  hostSpecies: {
    id: 'yeti.facet.hostSpecies',
    defaultMessage: 'Host species',
  },
  hostTaxon: {
    id: 'yeti.facet.hostTaxon',
    defaultMessage: 'Host taxon',
  },
  immunogenSpecies: {
    id: 'yeti.facet.immunogenSpecies',
    defaultMessage: 'Immunogen species',
  },
  isotype: {
    id: 'yeti.facet.isotype',
    defaultMessage: 'Isotype',
  },
  knockoutValidated: {
    id: 'yeti.facet.knockoutValidated',
    defaultMessage: 'Knockout validated',
  },
  modification: {
    id: 'yeti.facet.modification',
    defaultMessage: 'Modification',
  },
  nature: {
    id: 'yeti.facet.nature',
    defaultMessage: 'Nature',
  },
  platform: {
    id: 'yeti.facet.platform',
    defaultMessage: 'Platform',
  },
  preAdsorbed: {
    id: 'yeti.facet.preAdsorbed',
    defaultMessage: 'Pre-adsorbed',
  },
  productSubType: {
    id: 'yeti.facet.productSubType',
    defaultMessage: 'Product sub-type',
  },
  productTag: {
    id: 'yeti.facet.productTag',
    defaultMessage: 'Product tag',
  },
  productType: {
    id: 'yeti.facet.productType',
    defaultMessage: 'Product type',
  },
  proteinLength: {
    id: 'yeti.facet.proteinLength',
    defaultMessage: 'Protein length',
  },
  reactivity: {
    id: 'yeti.facet.reactivity',
    defaultMessage: 'Reactivity',
  },
  reactiveTaxon: {
    id: 'yeti.facet.reactiveTaxib',
    defaultMessage: 'Reactive taxon',
  },
  recombinant: {
    id: 'yeti.facet.recombinant',
    defaultMessage: 'Recombinant',
  },
  researchAreas: {
    id: 'yeti.facet.researchAreas',
    defaultMessage: 'Research areas',
  },
  sampleType: {
    id: 'yeti.facet.sampleType',
    defaultMessage: 'Sample type',
  },
  slideType: {
    id: 'yeti.facet.slideType',
    defaultMessage: 'Slide type',
  },
  speciesOfOrigin: {
    id: 'yeti.facet.speciesOfOrigin',
    defaultMessage: 'Species of origin',
  },
  specificity: {
    id: 'yeti.facet.specificity',
    defaultMessage: 'Specificity',
  },
  tag: {
    id: 'yeti.facet.tag',
    defaultMessage: 'Tag',
  },
  targetName: {
    id: 'yeti.facet.targetName',
    defaultMessage: 'Target name',
  },
  tissueType: {
    id: 'yeti.facet.tissueType',
    defaultMessage: 'Tissue type',
  },
  target: {
    id: 'yeti.facet.target',
    defaultMessage: 'Target',
  },
  categoryType: {
    id: 'yeti.facet.categoryType',
    defaultMessage: 'Category',
  },
})

export const facetItemMessages: MessagesType = defineMessages({
  'primarily antibody': {
    id: 'yeti.facetItem.primarilyAntibody',
    defaultMessage: 'Primary antibody',
  },
  'Primary Antibody': {
    id: 'yeti.facetItem.primaryAntibody',
    defaultMessage: 'Primary antibody',
  },
})
