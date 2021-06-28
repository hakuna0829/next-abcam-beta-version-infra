import { ThunkAction } from '@reduxjs/toolkit'
import {
  LoadRecommendedFacets,
  LoadRecommendedFacetsError,
  LoadRecommendedFacetsSuccess,
  LoadSuggestionsError,
  LoadSuggestionsRequest,
  LoadSuggestionsSuccess,
} from '@browse/store/actions/search-actions'
import { ApplicationState } from '@browse/store/base-types'
import { SetErrorCode } from '@browse/store/actions/basic-actions'
import { LoadSearchError } from '@browse/store/actions/search-result-actions'
import {
  RecommendedFacetsRequest,
  SuggestRequest,
} from '@browse/search/search.type'
import { SearchResultsService } from '@browse/services/search-results-service'

type Effect = ThunkAction<any, ApplicationState, any, any>

export const loadSuggestions = (request: SuggestRequest): Effect => (
  dispatch
) => {
  dispatch(LoadSuggestionsRequest())
  return SearchResultsService.getSuggest(request)
    .then((response) => {
      dispatch(SetErrorCode(response.status))
      dispatch(LoadSearchError(response.status))
      dispatch(LoadSuggestionsSuccess(response.data))
    })
    .catch((error) => {
      console.error('API error: ', error)
      dispatch(LoadSuggestionsError(error))
    })
}

export const loadRecommendedFacets = (
  request: RecommendedFacetsRequest
): Effect => (dispatch) => {
  dispatch(LoadRecommendedFacets())
  return SearchResultsService.getRecommendedFacets(request)
    .then((response) => {
      dispatch(SetErrorCode(response.status))
      dispatch(LoadSearchError(response.status))
      dispatch(LoadRecommendedFacetsSuccess(response.data))
    })
    .catch((error) => {
      console.error('API error: ', error)
      dispatch(LoadRecommendedFacetsError(error))
    })
}
