import { combineReducers } from 'redux'
import productReducer from './product-reducer'
import searchResultReducer from './search-result-reducer'
import searchReducer from './search-reducer'
import basicReducer from './basic-reducer'

export const rootReducer = combineReducers({
  basic: basicReducer,
  productReducer,
  search: searchReducer,
  searchResultReducer,
}) as any
