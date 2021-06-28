import {
  RecommendedFacetsResponse,
  Suggestion,
  SuggestResponse,
} from '@browse/search/search.type'
import { PreviousSearch } from '../reducers/search-reducer'

export const LOAD_SUGGESTIONS = 'LOAD_SUGGESTIONS'
export const LOAD_SUGGESTIONS_ERROR = 'LOAD_SUGGESTIONS_ERROR'
export const LOAD_SUGGESTIONS_SUCCESS = 'LOAD_SUGGESTIONS_SUCCESS'
export const LOAD_RECOMMENDED_FACETS = 'LOAD_RECOMMENDED_FACETS'
export const LOAD_RECOMMENDED_FACETS_ERROR = 'LOAD_RECOMMENDED_FACETS_ERROR'
export const LOAD_RECOMMENDED_FACETS_SUCCESS = 'LOAD_RECOMMENDED_FACETS_SUCCESS'
export const SET_SUGGESTIONS = 'SET_SUGGESTIONS'
export const SET_KEYWORDS = 'SET_KEYWORDS'
export const LOAD_PREVIOUS_SEARCHES = 'LOAD_PREVIOUS_SEARCHES'
export const ADD_PREVIOUS_SEARCH = 'ADD_PREVIOUS_SEARCH'
export const SET_SEARCH_FIXED = 'SET_SEARCH_FIXED'

interface SetSuggestions {
  type: typeof SET_SUGGESTIONS
  payload: Suggestion[]
}

interface LoadSuggestionsAction {
  type: typeof LOAD_SUGGESTIONS
}

interface LoadSuggestionsSuccess {
  type: typeof LOAD_SUGGESTIONS_SUCCESS
  payload: SuggestResponse
}

interface LoadSuggestionsError {
  type: typeof LOAD_SUGGESTIONS_ERROR
  payload: any // TODO: define with API team if there's a standard error response to handle?
}

interface LoadRecommendedFacets {
  type: typeof LOAD_RECOMMENDED_FACETS
}

interface LoadRecommendedFacetsSuccess {
  type: typeof LOAD_RECOMMENDED_FACETS_SUCCESS
  payload: RecommendedFacetsResponse
}

interface LoadRecommendedFacetsError {
  type: typeof LOAD_RECOMMENDED_FACETS_ERROR
  payload: any // TODO: define with API team if there's a standard error response to handle?
}

interface SetKeywords {
  type: typeof SET_KEYWORDS
  payload: string
}

interface SetSearchFixed {
  type: typeof SET_SEARCH_FIXED
  payload: boolean
}

interface AddPreviousSearch {
  type: typeof ADD_PREVIOUS_SEARCH
  payload: PreviousSearch
}

interface LoadPreviousSearches {
  type: typeof LOAD_PREVIOUS_SEARCHES
}

export type SearchActionTypes =
  | LoadSuggestionsAction
  | LoadSuggestionsSuccess
  | LoadSuggestionsError
  | LoadRecommendedFacets
  | LoadRecommendedFacetsSuccess
  | LoadRecommendedFacetsError
  | SetSuggestions
  | SetKeywords
  | LoadPreviousSearches
  | AddPreviousSearch
  | SetSearchFixed
