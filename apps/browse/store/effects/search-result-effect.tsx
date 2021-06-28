import { ThunkAction } from 'redux-thunk'
import { ApplicationState } from '@browse/store/base-types'
import {
  LoadSearchError,
  LoadSearchSuccess,
  LoadSearchRequest,
  LoadMoreProductItems,
} from '@browse/store/actions/search-result-actions'
import {
  AddPreviousSearch,
  SetKeywords,
} from '@browse/store/actions/search-actions'
import { Filter, Sorting } from '@browse/search/search.type'
import { SearchResultsService } from '@browse/services/search-results-service'

type Effect = ThunkAction<any, ApplicationState, any, any>

export const loadSearch = (
  keywords: string,
  facets: Filter[],
  sort: Sorting,
  offset: number,
  limit: number
): Effect => (dispatch) => {
  dispatch(LoadSearchRequest())

  return SearchResultsService.getSearch(keywords, sort, facets, offset, limit)
    .then((search) => {
      const _search = search.data
      dispatch(
        AddPreviousSearch({
          keywords,
          facets,
        })
      )

      if (offset > 0) {
        const items = _search?.products?.items
        return dispatch(LoadMoreProductItems(items))
      }
      return dispatch(LoadSearchSuccess(_search))
    })
    .catch((e) => {
      facets && dispatch(SetKeywords(keywords || facets[0].label))
      dispatch(LoadSearchError(e.response.status))
    })
}
