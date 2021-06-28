import produce, { Draft } from 'immer'
import {
  Entity,
  Facet,
  FacetsHeader,
  Filter,
  Suggestion,
  SuggestSpellCheck,
} from '@browse/search/search.type'
import {
  LOAD_RECOMMENDED_FACETS,
  LOAD_RECOMMENDED_FACETS_ERROR,
  LOAD_RECOMMENDED_FACETS_SUCCESS,
  LOAD_SUGGESTIONS,
  LOAD_SUGGESTIONS_ERROR,
  LOAD_SUGGESTIONS_SUCCESS,
  SearchActionTypes,
  SET_SUGGESTIONS,
  SET_KEYWORDS,
  ADD_PREVIOUS_SEARCH,
  LOAD_PREVIOUS_SEARCHES,
  SET_SEARCH_FIXED,
} from '../types/search-types'
//import history from 'history/browser';
//import queryString from 'query-string';

//const search = history.location.hash || history.location.search;
//const queryParams = queryString.parse(search.split('?')[1]);

const PREVIOUS_SEARCHES_STORAGE_KEY = 'previousSearches'

export interface PreviousSearch {
  keywords: string
  facets: Filter[]
}

export interface SearchState {
  entities: Entity[]
  keywords: string
  suggestions: Suggestion[]
  suggestionSpellChecks: SuggestSpellCheck[]
  facets: Facet[]
  facetsHeader: FacetsHeader | undefined
  previousSearches: PreviousSearch[]
  fixAsHeader: boolean
}

export const initialState: SearchState = {
  entities: [],
  keywords: '', //(queryParams?.keywords as string) || '',
  suggestions: [],
  suggestionSpellChecks: [],
  facets: [],
  facetsHeader: undefined,
  previousSearches: [],
  fixAsHeader: true,
}

const searchReducer = (state = initialState, action: SearchActionTypes) => {
  switch (action.type) {
    case LOAD_SUGGESTIONS:
      return { ...state }

    case LOAD_SUGGESTIONS_SUCCESS:
      return produce(state, (draft: Draft<SearchState>) => {
        draft.suggestions = action.payload.suggestions
        draft.suggestionSpellChecks = action.payload.spellcheck
      })

    case SET_SUGGESTIONS:
      return produce(state, (draft: Draft<SearchState>) => {
        draft.suggestions = action.payload
      })

    case LOAD_SUGGESTIONS_ERROR:
      return { ...state }

    case LOAD_RECOMMENDED_FACETS:
      return { ...state }

    case LOAD_RECOMMENDED_FACETS_SUCCESS:
      return produce(state, (draft: Draft<SearchState>) => {
        draft.facets = action.payload.facets
        draft.facetsHeader = action.payload.facetsHeader
      })

    case LOAD_RECOMMENDED_FACETS_ERROR:
      return { ...state }

    case SET_KEYWORDS:
      return produce(state, (draft: Draft<SearchState>) => {
        draft.keywords = action.payload
      })

    case SET_SEARCH_FIXED:
      return produce(state, (draft: Draft<SearchState>) => {
        draft.fixAsHeader = Boolean(action.payload)
      })

    case LOAD_PREVIOUS_SEARCHES:
      return produce(state, (draft: Draft<SearchState>) => {
        const previousSearchesString = localStorage.getItem(
          PREVIOUS_SEARCHES_STORAGE_KEY
        )
        if (previousSearchesString) {
          draft.previousSearches = [
            ...(JSON.parse(previousSearchesString) as PreviousSearch[]),
          ].slice(0, 6)
        }
      })

    case ADD_PREVIOUS_SEARCH:
      // eslint-disable-next-line no-case-declarations
      let previousSearchesString = localStorage.getItem(
        PREVIOUS_SEARCHES_STORAGE_KEY
      )
      if (!previousSearchesString) {
        previousSearchesString = '[]'
      }
      searchAlreadyExists(
        action.payload,
        JSON.parse(previousSearchesString) as PreviousSearch[]
      ).then((value) => {
        if (value) {
          return { ...state }
        } else {
          return produce(state, (draft: Draft<SearchState>) => {
            draft.previousSearches.unshift({ ...action.payload })
            localStorage.setItem(
              PREVIOUS_SEARCHES_STORAGE_KEY,
              JSON.stringify(draft.previousSearches)
            )
          })
        }
      })

    // eslint-disable-next-line no-fallthrough
    default:
      return { ...state }
  }
}

const searchAlreadyExists = (
  search: PreviousSearch,
  previousSearches: PreviousSearch[]
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    let keywordsAreTheSame = false
    let facetsAreTheSame = false

    if (previousSearches.length === 0) {
      resolve(false)
    }

    previousSearches.forEach((previousSearch, index) => {
      keywordsAreTheSame = previousSearch.keywords === search.keywords
      if (keywordsAreTheSame) {
        const facetsIntersection = previousSearch.facets.filter((facet) => {
          return search.facets.map((s) => s.label).indexOf(facet.label) > -1
        })
        facetsAreTheSame = facetsIntersection.length === search.facets.length
        if (facetsAreTheSame) {
          resolve(keywordsAreTheSame && facetsAreTheSame)
        }
      }

      if (previousSearches.length - 1 === index) {
        resolve(keywordsAreTheSame && facetsAreTheSame)
      }
    })
  })
}

// eslint-disable-next-line import/no-default-export
export default searchReducer
