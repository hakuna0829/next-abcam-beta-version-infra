import {
  RecommendedFacetsResponse,
  Suggestion,
  SuggestResponse,
} from '@browse/search/search.type'
import { PreviousSearch } from '../reducers/search-reducer'
import {
  ADD_PREVIOUS_SEARCH,
  LOAD_PREVIOUS_SEARCHES,
  LOAD_RECOMMENDED_FACETS,
  LOAD_RECOMMENDED_FACETS_ERROR,
  LOAD_RECOMMENDED_FACETS_SUCCESS,
  LOAD_SUGGESTIONS,
  LOAD_SUGGESTIONS_ERROR,
  LOAD_SUGGESTIONS_SUCCESS,
  SearchActionTypes,
  SET_KEYWORDS,
  SET_SEARCH_FIXED,
  SET_SUGGESTIONS,
} from '../types/search-types'

export const LoadSuggestionsRequest = (): SearchActionTypes => ({
  type: LOAD_SUGGESTIONS,
})

export const SetSuggestions = (
  suggestions: Suggestion[]
): SearchActionTypes => ({
  type: SET_SUGGESTIONS,
  payload: suggestions,
})

export const LoadSuggestionsSuccess = (
  response: SuggestResponse
): SearchActionTypes => ({
  type: LOAD_SUGGESTIONS_SUCCESS,
  payload: response,
})

export const LoadSuggestionsError = (error: any): SearchActionTypes => ({
  type: LOAD_SUGGESTIONS_ERROR,
  payload: error,
})

export const LoadRecommendedFacets = (): SearchActionTypes => ({
  type: LOAD_RECOMMENDED_FACETS,
})

export const LoadRecommendedFacetsSuccess = (
  response: RecommendedFacetsResponse
): SearchActionTypes => ({
  type: LOAD_RECOMMENDED_FACETS_SUCCESS,
  payload: response,
})

export const LoadRecommendedFacetsError = (
  errorCode: any
): SearchActionTypes => ({
  type: LOAD_RECOMMENDED_FACETS_ERROR,
  payload: errorCode,
})

export const SetKeywords = (keywords: string): SearchActionTypes => ({
  type: SET_KEYWORDS,
  payload: keywords,
})

export const SetSearchFixed = (fixAsHeader: boolean): SearchActionTypes => ({
  type: SET_SEARCH_FIXED,
  payload: fixAsHeader,
})

export const LoadPreviousSearches = (): SearchActionTypes => ({
  type: LOAD_PREVIOUS_SEARCHES,
})

export const AddPreviousSearch = (
  search: PreviousSearch
): SearchActionTypes => ({
  type: ADD_PREVIOUS_SEARCH,
  payload: search,
})
