import { State } from '../index'
import { createSelector } from '@reduxjs/toolkit'
import { SearchResultState } from '../reducers/search-result-reducer'

const getSearchResultState = (state: State) => state.searchResultReducer

const getSearch = (state: State) => state?.searchResultReducer?.search

const getProductItems = createSelector(
  getSearchResultState,
  (state: SearchResultState) => state?.search?.result?.products?.items || []
)

const getFacets = createSelector(
  getSearchResultState,
  (state: SearchResultState) => state?.search?.result?.products?.facets || []
)

const getProductCode = createSelector(
  getSearchResultState,
  (state: SearchResultState) => state?.search?.productCode || ''
)

const getKeywords = (state: State) => state?.search?.keywords || ''

const getResultLoading = createSelector(
  getSearchResultState,
  (state: SearchResultState) => state.loading?.result
)

const getProductItemsCount = createSelector(
  getSearchResultState,
  (state: SearchResultState) =>
    state?.search?.result?.products?.header?.productCount
)
const getLastLocation = (state: State) => state?.search?.lastLocation

const getSorting = createSelector(
  getSearchResultState,
  (state: SearchResultState) => state?.search?.sorting
)

const getErrorCode = createSelector(
  getSearchResultState,
  (state: SearchResultState) => state?.errorCode
)

export {
  getSearch,
  getProductItems,
  getProductCode,
  getKeywords,
  getResultLoading,
  getProductItemsCount,
  getLastLocation,
  getFacets,
  getSorting,
  getErrorCode,
}
