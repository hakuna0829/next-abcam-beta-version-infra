import {
  Search,
  RecommendedFacets,
  Suggest,
  Filter,
  Sorting,
  Product,
} from '@browse/search/search.type'

import {
  LOAD_SEARCH_RESULT,
  LOAD_SEARCH_SUCCESS,
  LOAD_SEARCH_ERROR,
  LOAD_RECOMMENDED_FACETS_RESULT,
  LOAD_RECOMMENDED_FACETS_SUCCESS,
  LOAD_RECOMMENDED_FACETS_ERROR,
  LOAD_SUGGEST_RESULT,
  LOAD_SUGGEST_SUCCESS,
  LOAD_SUGGEST_ERROR,
  ADD_FILTER,
  REMOVE_FILTER,
  RESET_FILTERS,
  RESET_FILTERS_BY_TYPE,
  ADD_ONE_FILTER_BY_TYPE,
  SET_PRODUCT_CODE,
  APPLY_SORTING,
  CLEAR_SEARCH,
  SET_FILTERS,
  LOAD_MORE_PRODUCT_ITEMS,
  SET_LAST_LOCATION,
} from '@browse/search/search.type'

// Search
export const LoadSearchRequest = () => ({
  type: LOAD_SEARCH_RESULT,
})

export const LoadSearchSuccess = (search: Search) => ({
  type: LOAD_SEARCH_SUCCESS,
  search,
})

export const LoadSearchError = (errorCode: number) => ({
  type: LOAD_SEARCH_ERROR,
  payload: errorCode,
})

// Recommended Facets
export const LoadRecommendedFacetsRequest = () => ({
  type: LOAD_RECOMMENDED_FACETS_RESULT,
})

export const LoadRecommendedFacetsSuccess = (
  recommendedFacets: RecommendedFacets
) => ({
  type: LOAD_RECOMMENDED_FACETS_SUCCESS,
  recommendedFacets,
})

export const LoadRecommendedFacetsError = () => ({
  type: LOAD_RECOMMENDED_FACETS_ERROR,
})

// Suggest
export const LoadSuggestRequest = () => ({
  type: LOAD_SUGGEST_RESULT,
})

export const LoadSuggestSuccess = (suggest: Suggest) => ({
  type: LOAD_SUGGEST_SUCCESS,
  suggest,
})

export const LoadSuggestError = () => ({
  type: LOAD_SUGGEST_ERROR,
})

export const SetProductCode = (productCode: string | undefined) => ({
  type: SET_PRODUCT_CODE,
  productCode,
})

export const AddFilter = (filter: Filter) => ({
  type: ADD_FILTER,
  filter,
})

export const RemoveFilter = (filter: Filter) => ({
  type: REMOVE_FILTER,
  filter,
})

export const ResetFilters = () => ({
  type: RESET_FILTERS,
})

export const SetFilters = (filters: Filter[]) => ({
  type: SET_FILTERS,
  filters,
})

export const ResetFilterByType = (filter: Filter) => ({
  type: RESET_FILTERS_BY_TYPE,
  filter,
})

export const AddOneFilterByType = (filter: Filter) => ({
  type: ADD_ONE_FILTER_BY_TYPE,
  filter,
})

export const ApplySorting = (sorting: Sorting) => ({
  type: APPLY_SORTING,
  sorting,
})

export const ClearSearch = () => ({
  type: CLEAR_SEARCH,
})

export const LoadMoreProductItems = (items: Product[]) => ({
  type: LOAD_MORE_PRODUCT_ITEMS,
  items,
})

export const SetLastLocation = (lastLocation: string) => ({
  type: SET_LAST_LOCATION,
  lastLocation,
})

export type SearchActions =
  | typeof LoadSearchRequest
  | typeof LoadSearchSuccess
  | typeof LoadSearchError
  | typeof LoadRecommendedFacetsRequest
  | typeof LoadRecommendedFacetsSuccess
  | typeof LoadRecommendedFacetsError
  | typeof LoadSuggestRequest
  | typeof LoadSuggestSuccess
  | typeof LoadSuggestError
  | typeof SetProductCode
  | typeof AddFilter
  | typeof RemoveFilter
  | typeof ResetFilters
  | typeof AddOneFilterByType
  | typeof ResetFilterByType
  | typeof ApplySorting
  | typeof ClearSearch
  | typeof SetFilters
  | typeof LoadMoreProductItems
  | typeof SetLastLocation
