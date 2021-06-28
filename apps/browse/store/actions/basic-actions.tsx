import {
  BasicActionTypes,
  SET_ERROR_CODE,
  SET_IS_HOME_PAGE,
  SET_SEARCH_STYLE,
} from '../types/basic-types'

export const SetIsHomePage = (isHomePage: boolean): BasicActionTypes => ({
  type: SET_IS_HOME_PAGE,
  payload: isHomePage,
})

export const SetSearchStyle = (setSearchStyle: string): BasicActionTypes => ({
  type: SET_SEARCH_STYLE,
  payload: setSearchStyle,
})

export const SetErrorCode = (
  errorCode: number | undefined
): BasicActionTypes => ({
  type: SET_ERROR_CODE,
  payload: errorCode,
})
