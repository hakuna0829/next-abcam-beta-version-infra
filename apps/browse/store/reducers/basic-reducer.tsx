import produce from 'immer'
import { State } from '../index'
import {
  SET_IS_HOME_PAGE,
  BasicActionTypes,
  SET_SEARCH_STYLE,
  SET_ERROR_CODE,
} from '../types/basic-types'

export interface BasicState {
  isHomePage: boolean
  searchStyle: string
  errorCode?: number
}

export const initialState: BasicState = {
  isHomePage: false,
  searchStyle: 'idle',
  errorCode: undefined,
}

const basicReducer = (state = initialState, action: BasicActionTypes) => {
  switch (action.type) {
    case SET_IS_HOME_PAGE: {
      return produce(state, (draft: State) => {
        draft.isHomePage = action.payload
      })
    }

    case SET_SEARCH_STYLE: {
      return produce(state, (draft: State) => {
        draft.searchStyle = action.payload
      })
    }

    case SET_ERROR_CODE: {
      return produce(state, (draft: State) => {
        draft.errorCode = action.payload
      })
    }

    default:
      return { ...state }
  }
}

// eslint-disable-next-line import/no-default-export
export default basicReducer
