export const SET_IS_HOME_PAGE = 'setIsHomePage'
export const SET_SEARCH_STYLE = 'setSearchStyle'
export const SET_ERROR_CODE = 'setErrorCode'

interface SetIsHomePage {
  type: typeof SET_IS_HOME_PAGE
  payload: boolean
}

interface SetSearchStyle {
  type: typeof SET_SEARCH_STYLE
  payload: string
}

interface SetErrorCode {
  type: typeof SET_ERROR_CODE
  payload: number | undefined
}

export type BasicActionTypes = SetIsHomePage | SetSearchStyle | SetErrorCode
