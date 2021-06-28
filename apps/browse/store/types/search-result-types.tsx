import {
  Filter,
  Product,
  RecommendedFacets,
  RecommendedFacetsResponse,
  Search,
  Sorting,
  Suggest,
  Suggestion,
  SuggestResponse,
} from '@browse/search/search.type'
import { PreviousSearch } from '@browse/store/reducers/search-reducer'
import {
  ADD_PREVIOUS_SEARCH,
  LOAD_PREVIOUS_SEARCHES,
  LOAD_RECOMMENDED_FACETS,
  LOAD_SUGGESTIONS,
  LOAD_SUGGESTIONS_ERROR,
  LOAD_SUGGESTIONS_SUCCESS,
  SET_KEYWORDS,
  SET_SEARCH_FIXED,
  SET_SUGGESTIONS,
} from '@browse/store/types/search-types'

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
  LOAD_SEARCH_RESULT,
  LOAD_SEARCH_SUCCESS,
  LOAD_SEARCH_ERROR,
  LOAD_RECOMMENDED_FACETS_RESULT,
  LOAD_RECOMMENDED_FACETS_SUCCESS,
  LOAD_RECOMMENDED_FACETS_ERROR,
  LOAD_SUGGEST_RESULT,
  LOAD_SUGGEST_SUCCESS,
  LOAD_SUGGEST_ERROR,
  SET_PRODUCT_CODE,
  ADD_FILTER,
  REMOVE_FILTER,
  RESET_FILTERS,
  RESET_FILTERS_BY_TYPE,
  ADD_ONE_FILTER_BY_TYPE,
  APPLY_SORTING,
  CLEAR_SEARCH,
  SET_FILTERS,
  LOAD_MORE_PRODUCT_ITEMS,
  SET_LAST_LOCATION,
}

// Search
interface LoadSearchRequest {
  type: typeof LOAD_SEARCH_RESULT
}

interface LoadSearchSuccess {
  type: typeof LOAD_SEARCH_SUCCESS
  search: string
}

interface LoadSearchError {
  type: typeof LOAD_SEARCH_ERROR
  payload: string | undefined
}

// Recommended Facets
interface LoadRecommendedFacetsRequest {
  type: typeof LOAD_RECOMMENDED_FACETS_RESULT
}

interface LoadRecommendedFacetsSuccess {
  type: typeof LOAD_RECOMMENDED_FACETS_SUCCESS
  recommendedFacets: RecommendedFacets
}

interface LoadRecommendedFacetsError {
  type: typeof LOAD_RECOMMENDED_FACETS_ERROR
}

// Suggest
interface LoadSuggestRequest {
  type: typeof LOAD_SUGGEST_RESULT
}

interface LoadSuggestSuccess {
  type: typeof LOAD_SUGGEST_SUCCESS
  suggest: Suggest
}

interface LoadSuggestError {
  type: typeof LOAD_SUGGEST_ERROR
}

interface SetProductCode {
  type: typeof SET_PRODUCT_CODE
  productCode: string
}

interface AddFilter {
  type: typeof ADD_FILTER
  filter: Filter
}

interface RemoveFilter {
  type: typeof REMOVE_FILTER
  filter: Filter
}

interface ResetFilters {
  type: typeof RESET_FILTERS
}

interface SetFilters {
  type: typeof SET_FILTERS
  filters: Filter[]
}

interface ResetFilterByType {
  type: typeof RESET_FILTERS_BY_TYPE
  filter: Filter
}

interface AddOneFilterByType {
  type: typeof ADD_ONE_FILTER_BY_TYPE
  filter: Filter
}

interface ApplySorting {
  type: typeof APPLY_SORTING
  sorting: Sorting
}

interface ClearSearch {
  type: typeof CLEAR_SEARCH
}

interface LoadMoreProductItems {
  type: typeof LOAD_MORE_PRODUCT_ITEMS
  items: any
}

interface SetLastLocation {
  type: typeof SET_LAST_LOCATION
  lastLocation: string
}

export type SearchActions =
  | LoadSearchRequest
  | LoadSearchSuccess
  | LoadSearchError
  | LoadRecommendedFacetsRequest
  | LoadRecommendedFacetsSuccess
  | LoadRecommendedFacetsError
  | LoadSuggestRequest
  | LoadSuggestSuccess
  | LoadSuggestError
  | SetProductCode
  | AddFilter
  | RemoveFilter
  | ResetFilters
  | AddOneFilterByType
  | ResetFilterByType
  | ApplySorting
  | ClearSearch
  | SetFilters
  | LoadMoreProductItems
  | SetLastLocation
