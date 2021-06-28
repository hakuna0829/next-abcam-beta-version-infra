import { SearchActions } from '../types/search-result-types'
import produce from 'immer'
import { State } from '../index'
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
  SET_PRODUCT_CODE,
  ADD_FILTER,
  REMOVE_FILTER,
  RESET_FILTERS,
  RESET_FILTERS_BY_TYPE,
  ADD_ONE_FILTER_BY_TYPE,
  APPLY_SORTING,
  CLEAR_SEARCH,
  SET_FILTERS,
  SET_LAST_LOCATION,
  LOAD_MORE_PRODUCT_ITEMS,
} from '../types/search-result-types'
//import history from 'history/browser';
import { parse } from 'query-string'
import { Filter } from '@browse/search/search.type'
import { getFiltersFromQueryParams } from '@browse/utils'

//const search = history.location.hash || history.location.search;
//const queryParams = parse(search.split('?')[1]);

export interface SearchResultState {
  loading: {
    result: boolean
    entity: boolean
    category: boolean
    suggest: boolean
  }
  search: {
    result: any
    suggest: any
    productCode: string
    keywords: string
    filters: Filter[]
    sorting: string | string[]
  }
  errorCode: any
}

export const initialState: SearchResultState = {
  loading: {
    result: true,
    entity: true,
    category: true,
    suggest: true,
  },
  search: {
    result: undefined,
    suggest: undefined,
    productCode: '',
    keywords: '',
    filters: [], //getFiltersFromQueryParams(queryParams),
    sorting: 'relevance', //queryParams?.sorting || 'relevance',
  },
  errorCode: undefined,
}

const searchResultReducer = (state = initialState, action: SearchActions) => {
  switch (action.type) {
    case LOAD_SEARCH_RESULT: {
      return produce(state, (draft: State) => {
        draft.loading.result = true
      })
    }
    case LOAD_SEARCH_SUCCESS: {
      return produce(state, (draft: State) => {
        draft.loading.result = false
        draft.search.result = action.search
      })
    }
    case LOAD_MORE_PRODUCT_ITEMS: {
      return produce(state, (draft: State) => {
        draft.search.result.products.items.push(...action.items)
        draft.loading.result = false
      })
    }
    case LOAD_SEARCH_ERROR: {
      return produce(state, (draft: State) => {
        draft.loading.result = false
        draft.errorCode = action.payload
      })
    }

    case LOAD_RECOMMENDED_FACETS_RESULT: {
      return produce(state, (draft: State) => {
        draft.loading.recommendedFacets = true
      })
    }
    case LOAD_RECOMMENDED_FACETS_SUCCESS: {
      return produce(state, (draft: State) => {
        draft.loading.recommendedFacets = false
        draft.search.recommendedFacets = action.recommendedFacets
      })
    }
    case LOAD_RECOMMENDED_FACETS_ERROR: {
      return produce(state, (draft: State) => {
        draft.search.recommendedFacets = undefined
        draft.loading.recommendedFacets = false
      })
    }

    case LOAD_SUGGEST_RESULT: {
      return produce(state, (draft: State) => {
        draft.loading.suggest = true
      })
    }
    case LOAD_SUGGEST_SUCCESS: {
      return produce(state, (draft: State) => {
        draft.loading.suggest = false
        draft.search.suggest = action.suggest
      })
    }

    case LOAD_SUGGEST_ERROR: {
      return produce(state, (draft: State) => {
        draft.search.suggest = undefined
        draft.loading.suggest = false
      })
    }

    case SET_PRODUCT_CODE: {
      return produce(state, (draft: State) => {
        draft.search.productCode = action.productCode
      })
    }

    case ADD_FILTER: {
      return produce(state, (draft: State) => {
        draft.search.filters = [...state.search.filters, action.filter]
      })
    }

    case ADD_ONE_FILTER_BY_TYPE: {
      return produce(state, (draft: State) => {
        const filterIteratee = (filter: Filter) =>
          action.filter.type !== filter.type
        draft.search.filters = [
          ...state.search.filters.filter(filterIteratee),
          action.filter,
        ]
      })
    }

    case REMOVE_FILTER: {
      return produce(state, (draft: State) => {
        const filterIteratee = (filter: Filter) =>
          action.filter.label !== filter.label ||
          action.filter.type !== filter.type
        draft.search.filters = state.search.filters.filter(filterIteratee)
      })
    }

    case RESET_FILTERS: {
      return produce(state, (draft: State) => {
        draft.search.filters = []
      })
    }

    case RESET_FILTERS_BY_TYPE: {
      return produce(state, (draft: State) => {
        const filterIteratee = (filter: Filter) =>
          action.filter.type !== filter.type
        draft.search.filters = state.search.filters.filter(filterIteratee)
      })
    }

    case APPLY_SORTING: {
      return produce(state, (draft: State) => {
        draft.search.sorting = action.sorting
      })
    }

    case CLEAR_SEARCH: {
      return produce(state, (draft: State) => {
        draft.search.result = undefined
      })
    }

    case SET_FILTERS: {
      return produce(state, (draft: State) => {
        draft.search.filters = action.filters
      })
    }

    case SET_LAST_LOCATION: {
      return produce(state, (draft: State) => {
        draft.search.lastLocation = action.lastLocation
      })
    }

    default:
      return { ...state }
  }
}

// eslint-disable-next-line import/no-default-export
export default searchResultReducer
