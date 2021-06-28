import type { DropDownType } from '@browse/components/dropdown'

export type EntityCategories = {
  categoryType: string
  totalProducts: number
  facetCategories: Array<FacetCategories>
}

export type Entity = {
  label: string
  type: string
  entitySynonyms: Array<string>
  totalCategories: number
  totalProducts: number
  categories: Array<EntityCategories>
}

export type FacetCategories = {
  type: string
  values: Array<Values>
}

export type Values = {
  label: string
  value: number
}

export interface Conjugation {
  label: string
  excitation: number
  emission: number
}

export interface Product {
  productCode: string
  productName: string
  imageCount: number
  publicationCount: number
  productTags: string[]
  applications: string[]
  reactiveTaxa: string[]
  conjugation: Conjugation
}

export interface Value {
  label: string
  count: number
}

type Operators = 'AND' | 'OR'
export type Sorting = 'relevance' | 'publications' | 'recency'

export interface Facet {
  type: string
  values: Value[]
  operator?: Operators
  displayOption: DropDownType
}

export interface Search {
  products: Product[]
  facets: Facet[]
}

export interface FacetsHeader {
  productCount: number
}
export interface RecommendedFacets {
  facetsHeader: FacetsHeader
  facets: Facet[]
}

export interface Suggestion {
  label: string
  type: string
}

export interface Spellcheck {
  term: 'humon'
  suggestions: string[]
}

export interface Suggest {
  suggestions: Suggestion[]
  spellcheck: Spellcheck[]
}

export interface Filter {
  label: string
  type: string
}

export interface SuggestSpellCheck {
  term: string
  suggestions: string[]
}

export interface SuggestResponse {
  suggestions: Suggestion[]
  spellcheck: SuggestSpellCheck[]
}

export interface SuggestRequest {
  keywords: string
  entities?: Entity[]
}

export interface RecommendedFacetsRequest {
  keywords: string
  entities: Entity[]
}
export interface RecommendedFacetsResponse {
  facetsHeader: FacetsHeader
  facets: Facet[]
}

export type TagCodes = 'RABMAB' | 'RECOMBINANT'

const LOAD_SEARCH_RESULT = 'loadSearchRequest'
const LOAD_SEARCH_SUCCESS = 'loadSearchSuccess'
const LOAD_SEARCH_ERROR = 'loadSearchError'
const LOAD_RECOMMENDED_FACETS_RESULT = 'loadRecommendedFacetsRequest'
const LOAD_RECOMMENDED_FACETS_SUCCESS = 'loadRecommendedFacetsSuccess'
const LOAD_RECOMMENDED_FACETS_ERROR = 'loadRecommendedFacetsError'
const LOAD_SUGGEST_RESULT = 'loadSuggestRequest'
const LOAD_SUGGEST_SUCCESS = 'loadSuggestSuccess'
const LOAD_SUGGEST_ERROR = 'loadSuggestError'
const SET_PRODUCT_CODE = 'setProductCodes'
const ADD_FILTER = 'addFilter'
const REMOVE_FILTER = 'removeFilter'
const RESET_FILTERS = 'resetFilters'
const RESET_FILTERS_BY_TYPE = 'resetFilterByType'
const ADD_ONE_FILTER_BY_TYPE = 'addOneFilterByType'
const APPLY_SORTING = 'applySorting'
const CLEAR_SEARCH = 'clearSearch'
const SET_FILTERS = 'setFilters'
const LOAD_MORE_PRODUCT_ITEMS = 'loadMoreProductItems'
const SET_LAST_LOCATION = 'setLastLocation'

export {
  ADD_FILTER,
  ADD_ONE_FILTER_BY_TYPE,
  APPLY_SORTING,
  CLEAR_SEARCH,
  LOAD_MORE_PRODUCT_ITEMS,
  LOAD_RECOMMENDED_FACETS_ERROR,
  LOAD_RECOMMENDED_FACETS_RESULT,
  LOAD_RECOMMENDED_FACETS_SUCCESS,
  LOAD_SEARCH_ERROR,
  LOAD_SEARCH_RESULT,
  LOAD_SEARCH_SUCCESS,
  LOAD_SUGGEST_ERROR,
  LOAD_SUGGEST_RESULT,
  LOAD_SUGGEST_SUCCESS,
  REMOVE_FILTER,
  RESET_FILTERS,
  RESET_FILTERS_BY_TYPE,
  SET_FILTERS,
  SET_LAST_LOCATION,
  SET_PRODUCT_CODE,
}

interface Header {
  productCount: number
}

export interface ProductResult {
  header: Header
  facets: Facet[]
  items: Product[]
}
export interface SearchResult {
  products: ProductResult
}

type SearchProps = {
  search: SearchResult
  sorting: string
  keywords: string
  filters: Filter[]
}

export type { SearchProps }
